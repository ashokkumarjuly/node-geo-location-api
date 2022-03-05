export default async (
    model: any,
    where: Record<string, any>,
    newItem: Record<string, any>
): Promise<Record<string, any>> => {
    // First try to find the record
    const record = await model.findOne({ where });

    if (!record) return model.create(newItem); // Item not found, create a new one

    await model.update(newItem, { where }); // Found an item, update it
    return record.reload(); // reload an instance to get latest
};
