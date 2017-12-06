package com.spike.templates.processors;

import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;

/**
 * Created by Dawid on 2017-09-06.
 */
public class WhileProcessor implements Processor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        String prefix = "while(" + element.attr(spikeAttribute) + "){";
        String suffix = "}";

        if (element.tagName().equals("spike")) {

            element.before(prefix);
            element.after(suffix);
            element.removeAttr(spikeAttribute);

        } else {
           throw new Exception("Spike Compiler: 'while' loop allowed only on @spike tags");
        }

    }

}
