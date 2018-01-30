package com.spike.templates.processors;

import com.spike.templates.TemplateCompiler;
import com.spike.templates.U;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class WatchProcessor implements Processor {

    static String watchAttribute = TemplateCompiler.PREFIX+"watch"+TemplateCompiler.SUFFIX;
    static private int watchId = 0;

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        watchId++;
        String watcherName = "spw"+watchId;

        String prefix = U.js("if(watcher."+watcherName+".changed){var t='';");
        String suffix = U.js("}");

        element.before(prefix);
        element.after(suffix);


        element.removeAttr(spikeAttribute);


    }

}
