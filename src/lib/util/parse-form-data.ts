import { error } from '@sveltejs/kit';
import type { ZodType, ZodTypeDef } from 'zod';

export async function parseFormData<Output, Input>(
	request: Request,
	schema: ZodType<Output, ZodTypeDef, Input>
) {
	const formData = Object.fromEntries(await request.formData());
	const parsedFormData = schema.safeParse(formData);

	if (!parsedFormData.success) {
		throw error(400);
	}

	return parsedFormData.data;
}
