import { VSCodeTemplateLoader } from "./loader/VSCodeTemplateLoader";
import { TemplateRender } from "./template/TemplateRender";
import { LlmProvider } from "../llm-provider/LlmProvider";
import { TemplateContext } from "./template/TemplateContext";
import { ChatContextManager } from "../chat-context/ChatContextManager";

export enum ActionType {
	AutoDoc,
	AutoTest,
}

export class PromptManager {
	private static _instance: PromptManager;
	private templateLoader: VSCodeTemplateLoader;

	private constructor() {
		this.templateLoader = new VSCodeTemplateLoader();
	}

	static getInstance(): PromptManager {
		if (!PromptManager._instance) {
			PromptManager._instance = new PromptManager();
		}
		return PromptManager._instance;
	}

	// chatContext(): string {
	// 	ChatContextManager.instance().collectChatContextList();
	// }

	async build(type: ActionType, context: TemplateContext): Promise<string> {
		let templateRender = new TemplateRender(this.templateLoader);
		let template: string;

		switch (type) {
			case ActionType.AutoDoc:
				template = await templateRender.getTemplate("prompts/genius/en/code/auto-doc.vm");
				break;
			case ActionType.AutoTest:
				template = await templateRender.getTemplate("prompts/genius/en/code/test-gen.vm");
				break;
		}

		return templateRender.render(template, context);
	}
}