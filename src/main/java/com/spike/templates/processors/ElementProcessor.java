package com.spike.templates.processors;

import com.spike.templates.TemplateCompiler;
import com.spike.templates.U;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;

/**
 * Created by Dawid on 2017-09-06.
 */
public class ElementProcessor implements Processor {

    public static int TRIGGER_ID = 0;

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (element.tagName().equals("spike")) {
            String includePartial = element.attr(spikeAttribute);
            String includeParams = element.attr(U.s("params"));
            String trigger = element.attr(U.s("trigger"));

            if(trigger.isEmpty()){

                if (includeParams.isEmpty()) {
                    includeParams = "{}";
                }

                element.replaceWith(new TextNode(U.ss(TemplateCompiler.INCLUDE_ELEMENT + "(new " + includePartial + "(scope, " + includeParams + "))"), ""));

            }else{

                if(!includeParams.isEmpty()){
                    throw new Exception("Spike Compiler: 'sp-params' statement not allowed when sp-trigger in use");
                }

                String triggerId = trigger+TRIGGER_ID;
                TRIGGER_ID++;

                Element newElement = new Element("div");
                newElement.html(element.html());
                newElement.attr("id", triggerId);
                newElement.attr("class", element.attr("class"));

                element.replaceWith(newElement);
                newElement.after(new TextNode(U.ss(TemplateCompiler.TRIGGER_ELEMENT + "('" + includePartial + "', '"+trigger+"','"+triggerId+"')"), ""));


            }

        } else {
            throw new Exception("Spike Compiler: 'include' statement allowed only on @spike tags");
        }

    }

}
