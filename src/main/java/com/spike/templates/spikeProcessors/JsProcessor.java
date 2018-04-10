package com.spike.templates.spikeProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class JsProcessor extends SpikeProcessor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (element.tagName().equals("spike")) {

            if (element.attr(spikeAttribute).equals("")) {

                String jsScript = element.html();
                this.replaceWith(element, U.js(jsScript));

            } else {
                String jsScript = element.attr(spikeAttribute);

                if(!jsScript.endsWith(";")){
                    jsScript = jsScript+";";
                }

                this.replaceWith(element, U.js(jsScript));

            }

        } else if (element.tagName().equals("script")) {

            if (element.attr(spikeAttribute).equals("")) {

                String jsScript = element.html();
                element.removeAttr(spikeAttribute);
                element.tagName("script");
                this.replaceWith(element, U.js(jsScript));

            } else {
                throw new Exception("Spike Compiler: 'js' statement with attribute expression allowed only on @spike tags");
            }

        } else {
            throw new Exception("Spike Compiler: 'js' statement allowed only on @spike and @script tags");
        }

    }

}
