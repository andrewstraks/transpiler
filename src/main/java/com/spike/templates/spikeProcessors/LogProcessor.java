package com.spike.templates.spikeProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class LogProcessor extends SpikeProcessor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (element.tagName().equals("spike")) {

            String jsScript = element.attr(spikeAttribute);
            jsScript = "spike.core.Log.templateLog("+jsScript+");";

            this.replaceWith(element, U.js(jsScript));


        } else {
            throw new Exception("Spike Compiler: 'js' statement allowed only on @spike and @script tags");
        }

    }

}
