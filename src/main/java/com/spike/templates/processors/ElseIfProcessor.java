package com.spike.templates.processors;

import com.spike.templates.U;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class ElseIfProcessor implements Processor {

    @Override
    public void process(Element element, String spikeAttribute) {

        String prefix = U.js(" else if(" + element.attr(spikeAttribute) + "){");
        String suffix = U.js("}");

        element.removeAttr(spikeAttribute);
        element.before(prefix);
        element.after(suffix);

    }

}
