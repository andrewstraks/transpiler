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

        if (element.tagName().toLowerCase().equals("input") && !element.attr(U.e("keyup")).isEmpty()) {
            eventBody = element.attr(U.e("keyup"));
        } else if (element.tagName().toLowerCase().equals("select") && !element.attr(U.e("change")).isEmpty()) {
            eventBody = element.attr(U.e("keyup"));
        }

        eventBody = bindModel + "=event.target.value;" + eventBody;

        if (element.tagName().toLowerCase().equals("input")) {
            element.attr(U.e("keyup"), eventBody);
            element.attr("spike-event-keyup-link", U.ss("linkId"));
        } else if (element.tagName().toLowerCase().equals("select")) {
            element.attr(U.e("change"), eventBody);
            element.attr("spike-event-change-link", U.ss("linkId"));
        }

        if (element.attr("spike-unbinded").isEmpty()) {
            element.attr("spike-unbinded", "");
        }

        String prefix = EventProcessor.processEventBodyVariables(eventBody);
        this.insertBefore(element, U.js(prefix));

        element.removeAttr(spikeAttribute);

    }

}
