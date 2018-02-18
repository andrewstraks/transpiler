package com.spike.templates.processors;

import com.spike.templates.TemplateCompiler;
import com.spike.templates.U;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class EnvIfProcessor implements Processor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if(!TemplateCompiler.ENV.toLowerCase().equals(element.attr(spikeAttribute).toLowerCase().trim())){
            element.remove();
        }else{
            element.removeAttr(spikeAttribute);
        }

    }

}
