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

        if (!element.tagName().equals("spike")) {
            throw new Exception("Spike Compiler: 'env' are only allowed on @spike tags");
        }

        if(!element.attr(spikeAttribute).toLowerCase().contains(TemplateCompiler.ENV.toLowerCase())){
            element.remove();
        }else{
            element.removeAttr(spikeAttribute);
        }

    }

}