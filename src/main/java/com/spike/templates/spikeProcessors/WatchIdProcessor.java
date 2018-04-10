package com.spike.templates.spikeProcessors;

import com.spike.templates.compilers.CommonCompiler;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class WatchIdProcessor extends SpikeProcessor {

    static private int watchId = 0;

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if(element.html().contains(CommonCompiler.PREFIX+"watch")){
            throw new Exception("Spike transpiler: Watcher cannot contains another watchers");
        }

        String watchName = "watcher-"+watchId;
        watchId++;

        if(element.attr(CommonCompiler.PREFIX+"watch").isEmpty()){
            element.attr(CommonCompiler.PREFIX+"watch", watchName);
        }

        if (element.id().isEmpty()) {
            watchId++;
            element.attr("id", watchName);
        }

    }

}
