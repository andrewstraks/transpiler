package com.spike.templates.spikeProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class BindProcessor extends SpikeProcessor {


    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (element.tagName().equals("spike")) {
            throw new Exception("Spike Compiler: 'bind' not allowed on @spike tags");
        }

        String bindModel = element.attr(spikeAttribute);

        if (bindModel.isEmpty()) {
            return;
        }

        String eventBody = "";
        String baseAssignValue = "=event.target.value;";
        String eventType = "";

        switch (element.tagName().toLowerCase()) {
            case "input":
            case "textarea":
                eventType = "keyup";
                baseAssignValue = "=event.target.value;";

                switch (element.attr("type")){
                    case "checkbox":
                        eventType = "change";
                        baseAssignValue = "=event.target.checked;";
                        break;
                    case "radio":
                        eventType = "change";
                        baseAssignValue = "=spike.core.Util.getRadioValue(event.target);";
                        break;
                }

                break;
            case "select":
            case "datalist":
                eventType = "change";
                baseAssignValue = "=event.target.value;";
                break;
            case "form":
                eventType = "change";
                baseAssignValue = "=spike.core.Util.serializeForm.bind(event.target.parentNode)();";
                break;
        }

        if (!element.attr(U.e(eventType)).isEmpty()) {
            eventBody = element.attr(U.e(eventType));
        }

        eventBody = bindModel + baseAssignValue + eventBody;

        element.attr(U.e(eventType), eventBody);
        element.attr("spike-event-"+eventType+"-link", U.ss("linkId"));

        if (element.attr("spike-unbinded").isEmpty()) {
            element.attr("spike-unbinded", "");
        }

        String prefix = EventProcessor.processEventBodyVariables(eventBody);
        this.insertBefore(element, U.js(prefix));

        element.removeAttr(spikeAttribute);

    }

}
