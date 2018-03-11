package com.spike.templates.processors;

import com.spike.templates.TemplateCompiler;
import com.spike.templates.U;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class BindProcessor implements Processor {

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
        } else if (element.tagName().toLowerCase().equals("select")) {
            element.attr(U.e("change"), eventBody);
        }

        if (element.attr("spike-unbinded").isEmpty()) {
            element.attr("spike-unbinded", "");
        }

        element.removeAttr(spikeAttribute);

    }

}
