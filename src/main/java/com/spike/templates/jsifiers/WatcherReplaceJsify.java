package com.spike.templates.jsifiers;

import com.spike.templates.compilers.CommonCompiler;

import java.util.regex.Pattern;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class WatcherReplaceJsify extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {
        return null;
    }

    @Override
    public String jsify(String output, String watcherName, String watcherOutput) throws Exception {
        System.out.println("watcherName : "+watcherName);
        return output.replace(CommonCompiler.WATCHER_PREFIX+watcherName+CommonCompiler.WATCHER_SUFFIX, watcherOutput);
    }

}
