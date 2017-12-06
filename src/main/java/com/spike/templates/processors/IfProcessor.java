package com.spike.templates.processors;

import com.spike.templates.NewTemplateCompiler;
import com.spike.templates.U;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class IfProcessor implements Processor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        String prefix = U.js("if(" + element.attr(spikeAttribute) + "){");
        String suffix = U.js("}");

        element.before(prefix);
        element.after(suffix);
        element.removeAttr(spikeAttribute);

    }

}
