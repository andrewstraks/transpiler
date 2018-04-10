package com.spike.templates.spikeProcessors;

import com.spike.templates.compilers.CommonCompiler;
import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class ElementProcessor extends SpikeProcessor {

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

                this.replaceWith(element, U.ss(CommonCompiler.INCLUDE_ELEMENT + "(new " + includePartial + "(scope, " + includeParams + "))"));

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

                this.insertAfter(newElement, U.ss(CommonCompiler.TRIGGER_ELEMENT + "('" + includePartial + "', '"+trigger+"','"+triggerId+"')"));

            }

        } else {
            throw new Exception("Spike Compiler: 'include' statement allowed only on @spike tags");
        }

    }

}
