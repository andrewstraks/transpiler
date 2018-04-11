package com.spike.templates.spikeProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class ForProcessor extends SpikeProcessor {

    private class TemplateParts {
        public String varName;
        public String indexName;
        public String listName;
        public String prefix = "";
        public String suffix = "";
    }

    static int indexId = 0;

    private TemplateParts getTemplateParts(String repeat) {

        TemplateParts templateParts = new TemplateParts();
        templateParts.varName = null;
        templateParts.indexName = null;
        templateParts.listName = "";

        if(repeat.contains("++") || repeat.contains("--")){

            templateParts.prefix = "for("+repeat+"){";
            templateParts.suffix = "}";

        }else{

            String[] repeatElements = repeat.split(" in ");

            if (repeatElements[0].contains(",")) {
                templateParts.indexName = repeatElements[0].split(",")[1];
                templateParts.varName = repeatElements[0].split(",")[0];
            } else {
                templateParts.varName = repeatElements[0];
            }

            if(templateParts.indexName == null){
                templateParts.indexName = "index"+indexId;
                indexId++;
            }

            templateParts.listName = repeatElements[1];

            templateParts.prefix += "for(var " + templateParts.indexName + " = 0; " + templateParts.indexName + " < " + templateParts.listName + ".length; " + templateParts.indexName + "++){";
            if(templateParts.varName != null){
                templateParts.prefix += "var "+templateParts.varName+" = "+templateParts.listName+"["+templateParts.indexName+"];";
            }

            templateParts.prefix += "(function("+templateParts.varName+") {";

            templateParts.suffix += "}("+templateParts.varName+"));";
            templateParts.suffix += "}";

        }

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
