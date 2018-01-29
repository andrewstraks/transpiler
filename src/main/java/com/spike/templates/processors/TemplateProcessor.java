package com.spike.templates.processors;

import com.spike.templates.TemplateCompiler;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;

/**
 * Created by Dawid on 2017-09-06.
 */
public class TemplateProcessor implements Processor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if(element.tagName().equals("spike")){
            String templateName = element.attr(spikeAttribute);
            element.replaceWith(new TextNode(TemplateCompiler.TEMPLATE_SPIKE+"("+templateName+")", ""));
        }else{
            throw new Exception("Spike Compiler: 'template' statement allowed only on @spike tags");
        }

    }

}
