package com.spike.templates.processors;

import com.spike.templates.TemplateCompiler;
import com.spike.templates.U;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;

/**
 * Created by Dawid on 2017-09-06.
 */
public class TemplateProcessor implements Processor {

    public static int TRIGGER_ID = 100000;

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (element.tagName().equals("spike")) {
            String templateName = element.attr(spikeAttribute);
            String params = element.attr(TemplateCompiler.PREFIX + "params").trim();
            String trigger = element.attr(U.s("trigger"));

            if (trigger.isEmpty()) {

                if (params.isEmpty()) {
                    params = "scope";
                }

                element.replaceWith(new TextNode(U.ss(TemplateCompiler.TEMPLATE_SPIKE + "('" + templateName + "', " + params + ", $this)"), ""));

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
                newElement.after(new TextNode(U.ss(TemplateCompiler.TRIGGER_TEMPLATE + "('" + templateName + "', '" + trigger + "','" + triggerId + "')"), ""));


            }


        } else {
            throw new Exception("Spike Compiler: 'template' statement allowed only on @spike tags");
        }

    }

}
