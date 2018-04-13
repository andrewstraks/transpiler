package com.spike.templates.spikeProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class AttributeProcessor extends SpikeProcessor {


    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (element.tagName().equals("spike")) {
            throw new Exception("Spike Compiler: 'attribute' not allowed on @spike tags");
        }

        String attributeValue = element.attr(spikeAttribute);
        String distAttribute = spikeAttribute.replace(U.s("attribute")+"-", "");

        attributeValue = ProcessorUtils.removeBrackets(attributeValue);
        String condition = "(("+attributeValue+") ? '"+distAttribute+"' : '')";

        element.removeAttr(spikeAttribute);

        element.attr("spike-expression", U.ss(condition));

    }

}
