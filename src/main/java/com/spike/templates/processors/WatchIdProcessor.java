package com.spike.templates.processors;

import com.spike.templates.TemplateCompiler;
import com.spike.templates.U;
import org.jsoup.nodes.Element;

import java.util.HashMap;

/**
 * Created by Dawid on 2017-09-06.
 */
public class WatchIdProcessor implements Processor {

    static private int watchId = 0;

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if(element.html().contains(TemplateCompiler.PREFIX+"watch")){
            throw new Exception("Spike transpiler: Watcher cannot contains another watchers");
        }

        String watchName = "watcher-"+watchId;
        watchId++;

        if(element.attr(TemplateCompiler.PREFIX+"watch").isEmpty()){
            element.attr(TemplateCompiler.PREFIX+"watch", watchName);
        }

        if (element.id().isEmpty()) {
            watchId++;
            element.attr("id", watchName);
        }

    }

}
