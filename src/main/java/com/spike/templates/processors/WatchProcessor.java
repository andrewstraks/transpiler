package com.spike.templates.processors;

import com.spike.templates.TemplateCompiler;
import com.spike.templates.U;
import org.jsoup.nodes.Element;

import java.util.HashMap;

/**
 * Created by Dawid on 2017-09-06.
 */
public class WatchProcessor implements Processor {

    public static HashMap<String, Element> watchers = new HashMap<>();

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (element.tagName().equals("spike")) {
            throw new Exception("Spike Compiler: 'watch' are not allowed on @spike tags");
        }

        if(element.html().contains(TemplateCompiler.PREFIX+"watch")){
            throw new Exception("Spike transpiler: Watcher cannot contains another watchers");
        }

        String watcherName = element.attr(TemplateCompiler.PREFIX+"watch");

        if (element.id().isEmpty()) {
            element.attr("id", watcherName);
        }

        String prefix = U.js("'@@"+watcherName+"@@'");
        element.before(prefix);

        watchers.put(watcherName, element);

    }

}
