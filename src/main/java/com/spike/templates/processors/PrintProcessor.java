package com.spike.templates.processors;

import com.spike.templates.NewTemplateCompiler;
import com.spike.templates.U;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;

/**
 * Created by Dawid on 2017-09-06.
 */
public class PrintProcessor implements Processor {

    @Override
    public void process(Element element, String spikeAttribute) {

        String value = U.ss(element.attr(spikeAttribute));

        if(element.tagName().equals("spike")){
            element.replaceWith(new TextNode(value, ""));
        }else{
            element.removeAttr(spikeAttribute);
            element.html(value);
        }

    }

}
