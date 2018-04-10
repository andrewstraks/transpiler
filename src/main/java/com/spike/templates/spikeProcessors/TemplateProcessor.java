package com.spike.templates.spikeProcessors;

import com.spike.templates.compilers.CommonCompiler;
import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class TemplateProcessor extends SpikeProcessor {

    public static int TRIGGER_ID = 100000;

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (element.tagName().equals("spike")) {
            String templateName = element.attr(spikeAttribute);
            String params = element.attr(CommonCompiler.PREFIX + "params").trim();
            String trigger = element.attr(U.s("trigger"));

            if (trigger.isEmpty()) {

                if (params.isEmpty()) {
                    params = "scope";
                }

                this.replaceWith(element, U.ss(CommonCompiler.TEMPLATE_SPIKE + "('" + templateName + "', " + params + ", parent)"));

            } else {

                if (!params.isEmpty()) {
                    throw new Exception("Spike Compiler: 'sp-params' statement not allowed when sp-trigger in use");
                }

                String triggerId = trigger + TRIGGER_ID;
                TRIGGER_ID++;

                Element newElement = new Element("div");
                newElement.html(element.html());
                newElement.attr("id", triggerId);
                newElement.attr("class", element.attr("class"));
                //newElement.attr("sp-keep-id","");

                element.replaceWith(newElement);

                this.insertBefore(newElement, U.ss(CommonCompiler.TRIGGER_TEMPLATE + "('" + templateName + "', '" + trigger + "','" + triggerId + "')"));

            }


        } else {
            throw new Exception("Spike Compiler: 'template' statement allowed only on @spike tags");
        }

    }

}
