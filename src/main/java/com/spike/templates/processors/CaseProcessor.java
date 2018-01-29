package com.spike.templates.processors;

import com.spike.templates.U;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class CaseProcessor implements Processor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        String prefix = U.js("case " + element.attr(spikeAttribute) + " : ");
        Boolean isBreakAttr = element.hasAttr(U.s("break"));

        String suffix = "";

        if(isBreakAttr){
            suffix = U.js("break;");
        }

        if (element.tagName().equals("spike")) {

            element.before(prefix);
            element.after(suffix);
            element.removeAttr(spikeAttribute);
            element.removeAttr(U.s("break"));

        } else {
            throw new Exception("Spike Compiler: 'case' statement allowed only on @spike tags");
        }

    }

}
