package com.spike.templates.processors;

import com.spike.templates.U;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class ForEachProcessor implements Processor {

    public static int NEXT_INDEX = 1;
    public static String INDEX = "__index";
    public static String PROP = "__prop";

    private class TemplateParts {
        public String varName;
        public String indexName;
        public String listName;
        public String prefix;
        public String suffix;
    }

    private TemplateParts getTemplateParts(String repeat) {

        TemplateParts templateParts = new TemplateParts();
        templateParts.varName = null;
        templateParts.indexName = null;
        templateParts.listName = "";

        String[] repeatElements = repeat.split(" in ");

        String propName = PROP + NEXT_INDEX;
        if (repeatElements[0].contains(",")) {
            templateParts.varName = repeatElements[0].split(",")[0];
            templateParts.indexName = repeatElements[0].split(",")[1];
        } else {
            templateParts.varName = repeatElements[0];
            templateParts.indexName = INDEX + NEXT_INDEX;
            NEXT_INDEX++;
        }

        templateParts.listName = repeatElements[1];

        templateParts.prefix = "var "+templateParts.indexName+" = 0; for(var "+propName+ " in " + templateParts.listName + "){";
        templateParts.prefix += " var "+templateParts.varName+" = "+templateParts.listName+"["+propName+"];";
        templateParts.suffix = " "+templateParts.indexName+"++; }";

        return templateParts;

    }

    @Override
    public void process(Element element, String spikeAttribute) {

        TemplateParts templateParts = this.getTemplateParts(element.attr(spikeAttribute));

        element.removeAttr(spikeAttribute);
        element.before(U.js(templateParts.prefix));
        element.after(U.js(templateParts.suffix));


    }


}
