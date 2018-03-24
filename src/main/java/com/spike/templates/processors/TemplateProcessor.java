package com.spike.templates.processors;

import com.spike.templates.TemplateCompiler;
import com.spike.templates.U;
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

            String params = element.attr(TemplateCompiler.PREFIX+"params").trim();

            if(params.isEmpty()){
                params = "scope";
            }

            element.replaceWith(new TextNode(U.ss(TemplateCompiler.TEMPLATE_SPIKE+"('"+templateName+"', "+params+")"), ""));

        }else{
            throw new Exception("Spike Compiler: 'template' statement allowed only on @spike tags");
        }

    }

}
