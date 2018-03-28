package com.spike.templates.processors;

import com.spike.templates.TemplateCompiler;
import com.spike.templates.U;
import org.apache.commons.lang.StringUtils;
import org.jsoup.nodes.Element;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Dawid on 2017-09-06.
 */
public class EventProcessor implements Processor {

    static private int eventId = 0;

    @Override
    public void process(Element element, String event) throws Exception {


        if (element.tagName().equals("spike")) {
            throw new Exception("Spike Compiler: Events binding not allowed on @spike tags");
        } else {

            String eventBody = element.attr(event);

            String prefix = this.processEventBodyVariables(eventBody);

            element.before(U.js(prefix));
            element.removeAttr(event);

            event = event.replace(TemplateCompiler.PREFIX, "").replace(TemplateCompiler.SUFFIX, "");

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

        List<String> arguments = new ArrayList<>();
        arguments.add("scope");

        String[] split = eventFunctionBody.split("\\(");
        for (String str : split) {

            if (!str.contains("=")) {

                String[] args = str.replace(")", "").split(",");

                for (String arg : args) {

                    if (!arguments.contains(arg.trim()) && !arg.trim().equals("this") && !arg.contains(".") && !arg.contains("event")) {
                        arguments.add(arg.trim());
                    }

                }

            }

        }

        StringBuilder linkFunctionBuilder = new StringBuilder();

        for (String argument : arguments) {
            linkFunctionBuilder.append("var ").append(argument).append("=(").append(argument).append("=== undefined ? undefined :").append(argument).append(");");
        }

        linkFunctionBuilder.append("var linkId = spike.core.Util.hash();");
        linkFunctionBuilder.append("spike.core.Events.__linkReferences[linkId] = {};");
        linkFunctionBuilder.append("spike.core.Events.__linkReferences[linkId].fn = new Function(");

        for (String argument : arguments) {
            linkFunctionBuilder.append("\"").append(argument).append("\",");
        }

        linkFunctionBuilder.append("\"").append(eventFunctionBody).append("\");");

        linkFunctionBuilder.append("spike.core.Events.__linkReferences[linkId].args = [");

        for (String argument : arguments) {
            linkFunctionBuilder.append(argument).append(",");
        }

        linkFunctionBuilder.append("];");

        return linkFunctionBuilder.toString().replace(",]", "]").replace(",)", ")");
    }

}
