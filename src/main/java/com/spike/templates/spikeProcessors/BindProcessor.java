package com.spike.templates.spikeProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

import java.awt.*;

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

        boolean hasSpAtrtibute = !element.attr("sp-"+eventType).isEmpty();
        boolean hasSpEventAttribute = !element.attr(U.e(eventType)).isEmpty();

        System.out.println("hasSpAtrtibute : "+hasSpAtrtibute);
        System.out.println("hasSpEventAttribute : "+hasSpEventAttribute);

        if(hasSpAtrtibute){

            if (!element.attr("sp-"+eventType).isEmpty()) {
                eventBody = element.attr("sp-"+eventType);
            }

            System.out.println("eventBody : "+eventBody);

            eventBody = bindModel + baseAssignValue + eventBody;

            element.attr("sp-"+eventType, eventBody);

        }else if(hasSpEventAttribute){

            if (!element.attr(U.e(eventType)).isEmpty()) {
                eventBody = element.attr(U.e(eventType));
            }

            eventBody = bindModel + baseAssignValue + eventBody;

            element.attr(U.e(eventType), eventBody);
            element.attr("spike-event-"+eventType+"-link", U.ss("linkId"));

        }else{

            eventBody = bindModel + baseAssignValue;


            element.attr(U.e(eventType), eventBody);
            element.attr("spike-event-"+eventType+"-link", U.ss("linkId"));

        }

        String prefix = EventProcessor.processEventBodyVariables(eventBody);

        element.attr("spike-event", "");


        this.insertBefore(element, U.js(prefix));

        element.removeAttr(spikeAttribute);

    }

}
