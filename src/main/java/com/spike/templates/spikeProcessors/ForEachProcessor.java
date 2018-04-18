package com.spike.templates.spikeProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class ForEachProcessor extends SpikeProcessor {

    public static int NEXT_INDEX = 1;
    public static int NEXT_INDEX_LIST = 1;
    public static String INDEX = "__index";
    public static String PROP = "__prop";

    private class TemplateParts {
        public String varName;
        public String indexName;
        public String listName;
        public String prefix = "";
        public String suffix = "";
        public String propName;
    }

    private TemplateParts getTemplateParts(Element element, String repeat) {

        TemplateParts templateParts = new TemplateParts();
        templateParts.varName = null;
        templateParts.indexName = null;
        templateParts.listName = "";

        String[] repeatElements = repeat.split(" in ");

        templateParts.propName = PROP + NEXT_INDEX;

        if (repeatElements[0].contains(",")) {
            String[] split = repeatElements[0].split(",");

            templateParts.varName = split[0];
            templateParts.propName = split[1];

            if (split.length == 3) {
                templateParts.indexName = split[2];
            }

        } else {
            templateParts.varName = repeatElements[0];
        }

        templateParts.listName = repeatElements[1];

        if (templateParts.indexName != null) {
            templateParts.prefix = "var " + templateParts.indexName + " = 0;";
        }

        boolean hasFilterOrSort = element.hasAttr(U.s("filter")) || element.hasAttr(U.s("sort"));

        if(hasFilterOrSort){

            String listName = templateParts.listName;
            if(listName.contains(".")){
                listName = listName.substring(listName.lastIndexOf(".")+1, listName.length());
            }
            listName = listName+NEXT_INDEX_LIST;
            NEXT_INDEX_LIST++;

            templateParts.prefix += "var "+listName+"="+templateParts.listName+".concat();";
            templateParts.listName = listName;

        }

        if (element.hasAttr(U.s("filter"))) {
            templateParts.prefix += this.addFilter(templateParts, element.attr(U.s("filter")));
            element.removeAttr(U.s("filter"));
        }

        if (element.hasAttr(U.s("sort"))) {
            templateParts.prefix += this.addSorting(templateParts, element.attr(U.s("sort")));
            element.removeAttr(U.s("sort"));
        }

        templateParts.prefix += "for(var " + templateParts.propName + " in " + templateParts.listName + "){";

        templateParts.prefix += "if(" + templateParts.listName + ".hasOwnProperty(" + templateParts.propName + ")){";

        templateParts.prefix += " var " + templateParts.varName + " = " + templateParts.listName + "[" + templateParts.propName + "];";

        templateParts.prefix += "(function(" + templateParts.varName + ", " + templateParts.propName + ") {";

        if (templateParts.indexName != null) {
            templateParts.suffix = " " + templateParts.indexName + "++;";
        }
        templateParts.suffix += "}(" + templateParts.varName + ", " + templateParts.propName + "));";
        templateParts.suffix += "}";
        templateParts.suffix += "}";

        return templateParts;

    }

    @Override
    public void process(Element element, String spikeAttribute) {

        TemplateParts templateParts = this.getTemplateParts(element, element.attr(spikeAttribute));

        element.removeAttr(spikeAttribute);

        this.insertBefore(element, U.js(templateParts.prefix), true);
        this.insertAfter(element, U.js(templateParts.suffix), true);

    }

    public String addSorting(TemplateParts templateParts, String sortFunction) {

        sortFunction = sortFunction.trim();

        String sortPrefix = templateParts.listName + ".sort(function(item1, item2){";

        if (sortFunction.startsWith("'") && sortFunction.endsWith("'")) {
            sortPrefix += "return item1[" + sortFunction + "] > item2[" + sortFunction + "] ? 1 : 0;";
        } else {

            sortPrefix += "return " + sortFunction + "";

            if (!sortPrefix.endsWith(";")) {
                sortPrefix += ";";
            }

        }

        sortPrefix += "});";

        return sortPrefix;
    }

    public String addFilter(TemplateParts templateParts, String filterFunction) {

        filterFunction = filterFunction.trim();

        String filterPrefix = templateParts.listName+"="+templateParts.listName + ".filter(function(item){";

        filterPrefix += "return " + filterFunction + "";

        if (!filterPrefix.endsWith(";")) {
            filterPrefix += ";";
        }


        filterPrefix += "});";

        return filterPrefix;
    }


}
