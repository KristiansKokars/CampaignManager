import { error } from '@sveltejs/kit';
import type { SafeParseError, ZodType, ZodTypeDef } from 'zod';

export async function parseFormData<Output, Input>(
	request: Request,
	schema: ZodType<Output, ZodTypeDef, Input>,
	onFailure: (errorData: SafeParseError<Input>) => void = () => {
		throw error(400);
	}
) {
	const formData = Object.fromEntries(await request.formData());
	const parsedFormData = schema.safeParse(formData);

	if (!parsedFormData.success) {
		throw onFailure(parsedFormData);
	}

	return parsedFormData.data;
}
