package com.spike.templates.processors;

import com.spike.templates.TemplateCompiler;
import org.jsoup.nodes.Element;

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
            element.removeAttr(event);

            event = event.replace(TemplateCompiler.PREFIX,"").replace(TemplateCompiler.SUFFIX,"");

            element.attr("spike-unbinded", "");
            element.attr("spike-event-"+event, eventBody);

            if(element.id().isEmpty()){
                eventId++;
                element.attr("id", "spike-event-"+eventId);
            }

        }

    }

}
