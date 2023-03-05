import z from "zod";
import * as zfd from "zod-form-data";

export const zUsername = zfd.text(z.string().trim().min(5, "Username must be a minimum of 5 characters.").max(32, "Username must be a maximum of 32 characters.").regex(/^[a-zA-Z0-9 \.]+$/, "Username can only contain alphanumeric characters, spaces, and periods."))
export const zPassword = zfd.text(z.string().min(8, "Password must be a minimum of 8 characters.").max(64, "Password must be a maximum of 64 characters."))

export const zUser = zfd.formData({
    username: zUsername,
    password: zPassword,
});

export function zodObjErrMsg(error: z.ZodError) {
    const msgs = [];
    for (const e of error.issues) {
        if (e.code === 'invalid_type') {
            msgs.push(`${e.path[0]} must be a ${e.expected}.`);
        } else {
            msgs.push(e.message);
        }
    }
    return msgs.join(' ');
}

export const currentLocale = 'en-US';

const fmtLocalDate = new Intl.DateTimeFormat(currentLocale, {
    dateStyle: 'short',
});
export const fmtDate = fmtLocalDate.format;

const fmtLocalTime = new Intl.DateTimeFormat(currentLocale, {
    timeStyle: 'short',
});

export const fmtTime = fmtLocalTime.format;

export function dynFieldOnChange<T extends z.ZodTypeAny, Output = z.output<T>, Input = z.input<T>>(setter: React.Dispatch<React.SetStateAction<string>>, parser: z.ZodEffects<T, Output, Input>): React.ChangeEventHandler<HTMLInputElement> {
    return (e) => {
        const v = parser.safeParse(e.target.value); setter(v.success ? '' : v.error.issues[0].message)
    }
}
