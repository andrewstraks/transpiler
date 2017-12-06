package com.spike.templates.processors;

import com.spike.templates.U;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class ForProcessor implements Processor {

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

        if (repeatElements[0].contains(",")) {
            templateParts.varName = repeatElements[0].split(",")[0];
            templateParts.indexName = repeatElements[0].split(",")[1];
        } else {
            templateParts.indexName = repeatElements[0];
        }

        templateParts.listName = repeatElements[1];

        templateParts.prefix = "for(var " + templateParts.indexName + " = 0; i < " + templateParts.listName + ".length; " + templateParts.indexName + "++){";
        templateParts.suffix = "}";

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
