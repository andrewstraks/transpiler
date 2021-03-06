package com.spike.templates.spikeProcessors;

import com.spike.templates.compilers.CommonCompiler;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class HrefProcessor extends SpikeProcessor {

    static private int hrefId = 0;

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (element.tagName().equals("spike")) {
            throw new Exception("Spike Compiler: 'href' are not allowed on @spike tags");
        }

        String hrefValue = element.attr(spikeAttribute);

        if(element.attr(CommonCompiler.IDENTITY_ATTRIBUTE) == null || element.attr(CommonCompiler.IDENTITY_ATTRIBUTE).isEmpty()){
            hrefId++;
            element.attr(CommonCompiler.IDENTITY_ATTRIBUTE, "spike-href-"+hrefId);
        }

        element.attr("href", hrefValue);
        element.attr("spike-href","");
        element.removeAttr(spikeAttribute);

    }

}
