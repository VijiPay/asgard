import {
	type ValidationArguments,
	type ValidationOptions,
	ValidatorConstraint,
	type ValidatorConstraintInterface,
	registerDecorator,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
	validate(confirmNewPassword: string, args: ValidationArguments) {
		const [relatedPropertyName] = args.constraints;
		const relatedValue = (args.object as unknown as string)[
			relatedPropertyName
		];
		return confirmNewPassword === relatedValue;
	}

	defaultMessage(args: ValidationArguments) {
		return "Passwords do not match!";
	}
}

export function MatchPassword(
	property: string,
	validationOptions?: ValidationOptions,
) {
	return (
		object: { newPassword: string; confirmNewPassword: string },
		propertyName: string,
	) => {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [property],
			validator: MatchPasswordConstraint,
		});
	};
}
