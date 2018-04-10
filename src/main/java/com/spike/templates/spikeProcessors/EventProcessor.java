package com.spike.templates.spikeProcessors;

import com.spike.templates.compilers.CommonCompiler;
import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Created by Dawid on 2017-09-06.
 */
public class EventProcessor extends SpikeProcessor {

    static private int eventId = 0;
    static public int primitives = 0;

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

        List<String> arguments = new ArrayList<>();
        arguments.add("scope");

        String[] split = eventFunctionBody.split("\\(");
        for (String str : split) {

            if (!str.contains("=") && str.contains(")") && !str.trim().equals(")")) {

                String[] args = str.replace(")", "").split(",");

                for (String arg : args) {

                    if (!arguments.contains(arg.trim()) && !arg.trim().equals("this") && !arg.contains("event")) {
                        arguments.add(arg.trim());
                    }

                }

            }

        }

        StringBuilder linkFunctionBuilder = new StringBuilder();

        Map<String, String> argumentsWithDotToReplace = new HashMap<>();

        List<String> cleanArguments = new ArrayList<>();
        for (String argument : arguments) {

            if (!isPrimitive(argument)) {

                String varName = argument;
                if (argument.contains(".")) {
                    varName = varName.replaceAll(Pattern.quote("."), "_").trim();
                    argumentsWithDotToReplace.put(argument, varName);
                }

                linkFunctionBuilder.append("var ").append(varName).append("=(").append(argument).append("=== undefined ? undefined :").append(argument).append(");");
                cleanArguments.add(argument);

            }

        }

        arguments = cleanArguments;

        linkFunctionBuilder.append("var linkId = spike.core.Util.hash();");
        linkFunctionBuilder.append("spike.core.Events.__linkReferences[linkId] = {};");
        linkFunctionBuilder.append("spike.core.Events.__linkReferences[linkId].fn = new Function(");

        for (String argument : arguments) {

            if (argumentsWithDotToReplace.get(argument) != null) {
                linkFunctionBuilder.append("\"").append(argumentsWithDotToReplace.get(argument)).append("\",");
            } else {
                linkFunctionBuilder.append("\"").append(argument).append("\",");
            }


        }


        for (Map.Entry<String, String> entry : argumentsWithDotToReplace.entrySet()) {

            String argumentsWithDot = entry.getKey();
            String argumentToReplace = entry.getValue();

            eventFunctionBody = eventFunctionBody.replaceAll(Pattern.quote(argumentsWithDot), argumentToReplace);

        }

        linkFunctionBuilder.append("\"").append(eventFunctionBody).append("\");");

        linkFunctionBuilder.append("spike.core.Events.__linkReferences[linkId].args = [");

        for (String argument : arguments) {
            linkFunctionBuilder.append(argument).append(",");
        }

        linkFunctionBuilder.append("];");

        return linkFunctionBuilder.toString().replace(",]", "]").replace(",)", ")");
    }

    public static boolean isPrimitive(String argument) {

        if (argument.startsWith("'")) {
            return true;
        }

        try {

            new BigDecimal(argument);
            return true;

        } catch (Exception e) {
        }

        return false;

    }

}
