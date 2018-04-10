package com.spike.templates.spikeProcessors;

import com.spike.templates.compilers.CommonCompiler;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class EnvIfProcessor extends SpikeProcessor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (!element.tagName().equals("spike")) {
            throw new Exception("Spike Compiler: 'env' are only allowed on @spike tags");
        }

        if(!element.attr(spikeAttribute).toLowerCase().contains(CommonCompiler.ENV.toLowerCase())){
            element.remove();
        }else{
            element.removeAttr(spikeAttribute);
        }

    }

}
