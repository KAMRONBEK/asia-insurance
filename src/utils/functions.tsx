let hasOwnProperty = Object.prototype.hasOwnProperty;

export const isEmpty = (obj) => {
	// null and undefined are "empty"
	if (obj == null) return true;

	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length > 0) return false;
	if (obj.length === 0) return true;

	// If it isn't an object at this point
	// it is empty, but it can't be anything *but* empty
	// Is it empty?  Depends on your application.
	if (typeof obj !== "object") return true;

	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and valueOf enumeration bugs in IE < 9
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key)) return false;
	}

	return true;
};

//get name
export const extractNames = (insuranceType: object, typeName: string) => {
	let list = [];
	if (!isEmpty(insuranceType)) {
		//osago not empty
		Object.keys(insuranceType)?.map((typeItem, typeIndex) => {
			// for each item in Osago
			if (insuranceType[typeItem]) {
				Object.keys(insuranceType[typeItem])?.map((item, index) => {
					//for each item in 'Car','CarType'
					if (insuranceType[typeItem][item]) {
						//if item not empty, get name
						list.push({
							name: JSON.stringify(
								insuranceType[typeItem][item].name
							),
							parent: typeName,
							child: typeItem,
						});
					}
				});
			}
		});
	}
	return list;
};

export const extractTariffs = (insuranceType: object, typeName: string) => {
	let list = [];
	if (!isEmpty(insuranceType)) {
		//osago not empty
		Object.keys(insuranceType)?.map((typeItem, typeIndex) => {
			// for each item in Osago
			if (insuranceType[typeItem]) {
				Object.keys(insuranceType[typeItem])?.map((item, index) => {
					//for each item in 'Car','CarType'
					if (insuranceType[typeItem][item]) {
						//if item not empty, get name
						if (insuranceType[typeItem][item].tariff) {
							//if tariff exists
							list.push({
								tariff: JSON.stringify(
									insuranceType[typeItem][item].tariff
								),
								name: item,
							});
						}
					}
				});
			}
		});
	}
	return list;
};

export const replaceAt = (str: string, index: number, replacement: string) => {
	return (
		str.substr(0, index) +
		replacement +
		str.substr(index + replacement.length)
	);
};
