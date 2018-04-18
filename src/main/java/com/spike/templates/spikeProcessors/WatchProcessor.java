package com.spike.templates.spikeProcessors;

import com.spike.templates.compilers.CommonCompiler;
import com.spike.templates.U;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

import java.util.HashMap;

/**
 * Created by Dawid on 2017-09-06.
 */
public class WatchProcessor extends SpikeProcessor {

    public static HashMap<String, Element> watchers = new HashMap<>();

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (element.tagName().equals("spike")) {
            throw new Exception("Spike Compiler: 'watch' are not allowed on @spike tags");
        }

        if(element.html().contains(CommonCompiler.PREFIX+"watch")){
            throw new Exception("Spike transpiler: Watcher cannot contains another watchers");
        }

        String watcherName = element.attr(CommonCompiler.PREFIX+"watch");

        if (element.id().isEmpty()) {
            element.attr(CommonCompiler.IDENTITY_ATTRIBUTE, watcherName);
        }

        String prefix = U.js(CommonCompiler.WATCHER_PREFIX+watcherName+CommonCompiler.WATCHER_SUFFIX);

        this.insertBefore(element, prefix);

        watchers.put(watcherName, element);

    }

}
