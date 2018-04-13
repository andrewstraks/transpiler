package com.spike.templates.compilers;

import com.spike.templates.jsifiers.*;
import com.spike.templates.resulters.ReplacementResulter;
import com.spike.templates.spikeProcessors.WatchProcessor;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.Map;
import java.util.regex.Pattern;

/**
 * Created by Dawid on 2017-09-03.
 */
public class WatcherCompiler  {

    static ReplacementResulter replacementJsifier = new ReplacementResulter();

    public Element compile(Element body) throws Exception {

        Elements replacementElements = body.getElementsByTag("spike-replacement");
        for(Element element : replacementElements){
            replacementJsifier.result(element, true);
        }

        this.processRemovableAttributes(body);

        return body;

    }

    /**
     * TODO
     */
    public void processRemovableAttributes(Element body) {
    }

    public String jsify(Element body, String templatePath) throws Exception {

        String output = body.html();

        if (WatchProcessor.watchers.entrySet().size() > 0) {

            output = new SpikeTagJsifier().jsify(output);
            output = new EscapeJsJsifier().jsify(output);
            output = new WatchersConcatJsifier().jsify(output);
            output = new ReplaceBracketsJsifier().jsify(output);
            output = new WatchersRepairLinesJsifier().jsify(output, false);

            for (Map.Entry<String, Element> watcher : WatchProcessor.watchers.entrySet()) {

                String watcherOutput = watcher.getValue().outerHtml();

                watcherOutput = new EscapeJsJsifier().jsify(watcherOutput);
                watcherOutput = new ReplaceBracketsJsifier().jsify(watcherOutput);
                watcherOutput = new WatchersJsJsify().jsify(watcherOutput, watcher.getKey());
                watcherOutput = new WatchersRepairLinesJsifier().jsify(watcherOutput, true);

                output = new WatcherReplaceJsify().jsify(output, watcher.getKey(), watcherOutput);

            }

            output = new SpikeTagJsifier().jsify(output);
            output = new ReplaceEscapesJsifier().jsify(output);
            output = new OptimizeJsJsifier().jsify(output);
            output = new WatchersOptimizeJsJsifier().jsify(output);

            output = new WatcherFunctionJsifier().jsify(output, templatePath);

        }else{
            output = "";
        }

        return output;

    }



}
