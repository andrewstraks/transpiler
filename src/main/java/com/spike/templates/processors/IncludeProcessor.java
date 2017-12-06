package com.spike.templates.processors;

import com.spike.templates.NewTemplateCompiler;
import com.spike.templates.U;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;

/**
 * Created by Dawid on 2017-09-06.
 */
public class IncludeProcessor implements Processor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if(element.tagName().equals("spike")){
            String includePartial = element.attr(spikeAttribute);
            String includeParams = element.attr(U.s("params"));
            element.replaceWith(new TextNode(U.ss(NewTemplateCompiler.INCLUDE_SPIKE+"("+includePartial+", { "+includeParams+" })"), ""));
        }else{
            throw new Exception("Spike Compiler: 'include' statement allowed only on @spike tags");
        }

    }

}
