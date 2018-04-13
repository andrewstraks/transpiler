package com.spike.templates.spikeProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class ForEachProcessor extends SpikeProcessor {

    public static int NEXT_INDEX = 1;
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

    private TemplateParts getTemplateParts(String repeat) {

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

        templateParts.prefix += "for(var " + templateParts.propName + " in " + templateParts.listName + "){";

        templateParts.prefix += "if("+templateParts.listName+".hasOwnProperty("+templateParts.propName+")){";

        templateParts.prefix += " var " + templateParts.varName + " = " + templateParts.listName + "[" + templateParts.propName + "];";

        templateParts.prefix += "(function("+templateParts.varName+", "+templateParts.propName+") {";

        if (templateParts.indexName != null) {
            templateParts.suffix = " " + templateParts.indexName + "++;";
        }
        templateParts.suffix += "}("+templateParts.varName+", "+templateParts.propName+"));";
        templateParts.suffix += "}";
        templateParts.suffix += "}";

        return templateParts;

    }

    @Override
    public void process(Element element, String spikeAttribute) {

        TemplateParts templateParts = this.getTemplateParts(element.attr(spikeAttribute));

        element.removeAttr(spikeAttribute);

        this.insertBefore(element, U.js(templateParts.prefix));
        this.insertAfter(element, U.js(templateParts.suffix));

    }


}
