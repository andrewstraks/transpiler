package com.spike.templates.spikeProcessors;

import com.spike.templates.compilers.CommonCompiler;
import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class IncludeProcessor extends SpikeProcessor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (element.tagName().equals("spike")) {
            String includePartial = element.attr(spikeAttribute);
            String includeParams = element.attr(U.s("params"));

            if (includeParams.isEmpty()) {
                includeParams = "{}";
            }

            this.replaceWith(element, U.ss(CommonCompiler.INCLUDE_SPIKE + "(" + includePartial + ", " + includeParams + ")"));

        } else {
            throw new Exception("Spike Compiler: 'include' statement allowed only on @spike tags");
        }

    }

}
