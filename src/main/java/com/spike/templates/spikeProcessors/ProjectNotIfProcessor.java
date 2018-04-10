package com.spike.templates.spikeProcessors;

import com.spike.templates.compilers.CommonCompiler;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class ProjectNotIfProcessor extends SpikeProcessor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (!element.tagName().equals("spike")) {
            throw new Exception("Spike Compiler: 'not-project' are only allowed on @spike tags");
        }

        if(element.attr(spikeAttribute).toLowerCase().contains(CommonCompiler.PROJECT.toLowerCase())){
            element.remove();
        }else{
            element.removeAttr(spikeAttribute);
        }

    }

}
