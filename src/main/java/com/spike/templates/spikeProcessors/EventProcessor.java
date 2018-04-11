package com.spike.templates.spikeProcessors;

import com.spike.templates.compilers.CommonCompiler;
import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

import java.math.BigDecimal;
import java.util.*;
import java.util.regex.Pattern;

/**
 * Created by Dawid on 2017-09-06.
 */
public class EventProcessor extends SpikeProcessor {

    static private int eventId = 0;
    static public int closureId = 0;

    @Override
    public void process(Element element, String event) throws Exception {


        if (element.tagName().equals("spike")) {
            throw new Exception("Spike Compiler: Events binding not allowed on @spike tags");
        } else {

            String eventBody = element.attr(event);

            String prefix = this.processEventBodyVariables(eventBody);

            //element.before(U.js(prefix));

            this.insertBefore(element, U.js(prefix));

            element.removeAttr(event);

            event = event.replace(CommonCompiler.PREFIX, "").replace(CommonCompiler.SUFFIX, "");

            element.attr("spike-unbinded", "");
            element.attr("spike-event-" + event, eventBody);
            element.attr("spike-event-" + event + "-link", U.ss("linkId"));

            if (element.id().isEmpty()) {
                eventId++;
                element.attr("id", "spike-event-" + eventId);
            }

        }

    }

    public static String processEventBodyVariables(String eventFunctionBody) {

       StringBuilder linkFunctionBuilder = new StringBuilder();

        linkFunctionBuilder
                .append("function closure")
                .append(closureId)
                .append("(event){")
                .append(eventFunctionBody)
                .append("};")
                .append("var linkId = spike.core.Events.linkEvent(closure")
                .append(closureId)
                .append(");");

        closureId++;
        return linkFunctionBuilder.toString();

    }

}
