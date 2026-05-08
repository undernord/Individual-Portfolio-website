$(document).ready(function () {
    /* 1. 默认语言设置 */
    const lang = localStorage.getItem("lang");
    const defaultLang = lang ? lang : "en";
    
    // 设置初始按钮文本
    const initText = defaultLang === "zh" ? "ZH" : "EN";
    $("#lang-label").text(initText);

    /* 2. 初始化 i18n */
    $("[i18n]").i18n({
        defaultLang: defaultLang,
        filePath: "./i18n/", // <-- 明确指向 i18n 文件夹
        filePrefix: "",      // <-- 必须清空，因为你的文件叫 en.json，没有前缀
        forever: true,
        callback: function () {
            console.log("i18n is ready.");
        },
    });

    /* 3. 切换按钮的点击事件 */
    $("#translate-btn").click(function (e) {
        const currentLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : defaultLang;
        const targetLang = currentLang === "zh" ? "en" : "zh"; 
        
        // 更新按钮文本
        const newText = targetLang === "zh" ? "ZH" : "EN";
        $("#lang-label").text(newText);

        // 重新加载翻译
        $("[i18n]").i18n({
            defaultLang: targetLang,
            filePath: "./i18n/", 
            filePrefix: "",      
            callback: function () {
                localStorage.setItem("lang", targetLang);
            }
        });
    });
});