package com.spike.templates.processors;

import com.spike.templates.NewTemplateCompiler;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;

/**
 * Created by Dawid on 2017-09-06.
 */
public class EventProcessor implements Processor {

    @Override
    public void process(Element element, String event) throws Exception {

        if (element.tagName().equals("spike")) {
            throw new Exception("Spike Compiler: Events binding not allowed on @spike tags");
        } else {

            String eventBody = element.attr(event);
            element.removeAttr(event);

            event = event.replace(NewTemplateCompiler.PREFIX,"").replace(NewTemplateCompiler.SUFFIX,"");

            element.attr("spike-unbinded", "");
            element.attr("spike-event-"+event, eventBody);

        }

    }

}
