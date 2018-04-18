package com.spike.templates.compilers;

import com.spike.templates.U;
import com.spike.templates.processors.Processor;
import com.spike.templates.processors.SpikeProcessor;
import com.spike.templates.processors.TagProcessor;
import com.spike.templates.spikeProcessors.*;
import com.spike.templates.tagProcessors.PreProcessor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Attribute;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;

import java.io.File;
import java.util.*;

/**
 * Created by ds931004 on 05.04.2018.
 */
public class CommonCompiler {

    public static String MESSAGES_CLASS = "";
    public static final String TEMPLATE_SPIKE = "spike.core.Templates.includeTemplate";
    public static final String INCLUDE_ELEMENT = "scope.include";
    public static final String TRIGGER_ELEMENT = "scope.addTriggerElement";
    public static final String TRIGGER_TEMPLATE = "scope.addTriggerTemplate";
    public static final String INCLUDE_SPIKE = "app.partial.include";
    public static final String JS_HINT_LINE = "#js__line#";
    public static final String JS_HINT_BEGIN = "#js__begin#";
    public static final String JS_HINT_END = "#js__end#";
    public static final String PREFIX = "sp-";
    public static final String SUFFIX = "";
    public static final String BRACKET_LEFT = "{{";
    public static final String BRACKET_RIGHT = "}}";
    public static final String PARAMS = U.s("params");
    public static final String WATCHER_PREFIX = "#watcher_begin#";
    public static final String WATCHER_SUFFIX = "#watcher_begin#";
    public static final String IDENTITY_ATTRIBUTE = "sp-id";
    public static final String HANDLE_ATTRIBUTE = "sp-handle";

    public static String PROJECT = "";
    public static String ENV = "";

    public static HashMap<String, Object> spikeCommands = new HashMap<>();
    public static HashMap<String, TagProcessor> tagCommands = new HashMap<>();

    public static String[] allowedEvents = new String[]{
            "click",
            "change",
            "keyup",
            "keydown",
            "keypress",
            "blur",
            "focus",
            "dblclick",
            "die",
            "hover",
            "keydown",
            "mousemove",
            "mouseover",
            "mouseenter",
            "mousedown",
            "mouseleave",
            "mouseout",
            "submit",
            "toggle",
            "load",
            "unload"
    };

    static AttributeProcessor attributeProcessor = new AttributeProcessor();

    static {

        EventProcessor eventProcessor = new EventProcessor();

        for (String event : allowedEvents) {
            spikeCommands.put(U.s(event), eventProcessor);
        }

        spikeCommands.put(U.s("bind"), new BindProcessor());
        spikeCommands.put("name", new NameProcessor());
        spikeCommands.put(U.s("print"), new PrintProcessor());
        spikeCommands.put(U.s("style"), new StyleProcessor());
        spikeCommands.put(U.s("translation"), new TranslationProcessor());
        spikeCommands.put(U.s("placeholder"), new TranslationProcessor());
        spikeCommands.put(U.s("template"), new TemplateProcessor());
        spikeCommands.put(U.s("include"), new IncludeProcessor());
        spikeCommands.put(U.s("element"), new ElementProcessor());
        spikeCommands.put(U.s("js"), new JsProcessor());
        spikeCommands.put(U.s("href"), new HrefProcessor());
        spikeCommands.put(U.s("log"), new LogProcessor());
        spikeCommands.put(U.s("if"), new IfProcessor());
        spikeCommands.put(U.s("else-if"), new ElseIfProcessor());
        spikeCommands.put(U.s("else"), new ElseProcessor());
        spikeCommands.put(U.s("for"), new ForProcessor());
        spikeCommands.put(U.s("foreach"), new ForEachProcessor());
        spikeCommands.put(U.s("while"), new WhileProcessor());
        spikeCommands.put(U.s("switch"), new SwitchProcessor());
        spikeCommands.put(U.s("case"), new CaseProcessor());
        spikeCommands.put(U.s("break"), new BreakProcessor());
        spikeCommands.put(U.s("default"), new DefaultProcessor());
        spikeCommands.put(U.s("project"), new ProjectIfProcessor());
        spikeCommands.put(U.s("not-project"), new ProjectNotIfProcessor());
        spikeCommands.put(U.s("env"), new EnvIfProcessor());
        spikeCommands.put(U.s("watch"), new Processor[] { new WatchIdProcessor(), new WatchProcessor() });

        tagCommands.put("pre", new PreProcessor());

    }

    private static int generalId = 0;
    public static int generalCounter = 0;
    private static int elementId = 0;

    private static WatcherCompiler watcherCompiler = new WatcherCompiler();
    private static TemplateCompiler templateCompiler = new TemplateCompiler();

    public static String getFilePath(File templateFile){
      return templateFile.getPath().replaceAll("\\\\", "_").replace(".", "_");
    }

    public static String[] parseSpikeTemplate(File templateFile, String rootDir, String template) throws Exception {

        Document doc = Jsoup.parseBodyFragment(template);
        CommonCompiler.removeComments(doc);

//        Elements elements = doc.body().getAllElements();
//        for (Element element : elements) {
//
//            if (!element.tagName().toLowerCase().equals("spike")
//                    && !element.tagName().toLowerCase().equals("body")
//                    && !element.tagName().toLowerCase().equals("html")
//                    && element.attr(CommonCompiler.IDENTITY_ATTRIBUTE).isEmpty()) {
//                generalId++;
//                element.attr(IDENTITY_ATTRIBUTE, "id-" + generalId);
//            }
//
//        }

        CommonCompiler.compileTagsProcessors(doc);
        CommonCompiler.compileSpikeProcessors(doc);

        String templatePath = CommonCompiler.getFilePath(templateFile);

        Element body = doc.body();
        String bodyBeforeCompile = body.html();

        String plainTemplate = templateCompiler.jsify(templateCompiler.compile(body), templatePath);
        String watchTemplate = watcherCompiler.jsify(watcherCompiler.compile(body), templatePath);

        plainTemplate = "spike.core.Assembler.sourcePath='" + rootDir.substring(0, rootDir.lastIndexOf("/")) + "';" + plainTemplate;

        return new String[]{plainTemplate, watchTemplate, processBeforeCompile(bodyBeforeCompile), templatePath};
    }

    public static String processBeforeCompile(String html){

        Element element = new Element("div");
        element.html(html);

        Elements elements = element.getElementsByTag("pre");
        for(Element element1 : elements){
            element1.replaceWith(new Element("pre"));
        }

        return element.html();
    }

    public static void compileSpikeProcessors(Document doc) throws Exception {

        Elements allElements = doc.body().getAllElements();
        for(Element element : allElements){

            for (Map.Entry<String, Object> entry : spikeCommands.entrySet()) {
                String spikeAttribute = entry.getKey();

                List<SpikeProcessor> processors = new ArrayList<>();
                Object processor = entry.getValue();

                if(processor instanceof Processor){
                    processors.add((SpikeProcessor) processor);
                }else{

                    Processor[] processorArray = (Processor[]) processor;
                    for(Processor processor1 : processorArray){
                        processors.add((SpikeProcessor) processor1);
                    }
                }

                for(SpikeProcessor spikeProcessor : processors){

                    if(element.hasAttr(spikeAttribute)){
                        spikeProcessor.process(element, spikeAttribute);
                    }

                }

            }

            for(Attribute attribute : element.attributes().clone()){

                if(attribute.getKey().startsWith(U.s("attribute"))){
                    attributeProcessor.process(element, attribute.getKey());
                }

            }

        }

        Element fistElement = doc.body().children().first();
        if (fistElement.attr(CommonCompiler.IDENTITY_ATTRIBUTE).isEmpty()) {
            elementId++;
            fistElement.attr(CommonCompiler.IDENTITY_ATTRIBUTE, "element-" + elementId);
        }

    }

    public static void compileTagsProcessors(Document doc) throws Exception {

        for (Map.Entry<String, TagProcessor> entry : tagCommands.entrySet()) {

            String tagName = entry.getKey();
            TagProcessor processor = entry.getValue();

            Elements elements = doc.getElementsByTag(tagName);

            for (Element element : elements) {
                processor.process(element);
            }

        }

    }

    public static void removeComments(Node node) {
        for (int i = 0; i < node.childNodes().size(); ) {
            Node child = node.childNode(i);
            if (child.nodeName().equals("#comment")) child.remove();
            else {
                removeComments(child);
                i++;
            }
        }
    }

}
