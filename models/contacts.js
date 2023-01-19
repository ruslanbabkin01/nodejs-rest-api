const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const itemId = uid(4);
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

const getContactById = async (contactId) => {
  const result = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(result);
  const findContact = parsedData.find(
    (item) => item.id === contactId.toString()
  );
  return findContact;
};

const removeContact = async (contactId) => {
  if (!contactId) {
    return undefined;
  }
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  const removeIndex = parsedData.findIndex(
    (contact) => contact.id === contactId
  );

  if (removeIndex === -1) {
    return undefined;
  }

  const removedContact = parsedData[removeIndex];
  parsedData.splice(removeIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(parsedData, undefined, 2));

  return removedContact;
};

const addContact = async (body) => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(contacts);
  body = { id: itemId, ...body };

  parsedData.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(parsedData), "utf-8");

  return body;
};

const updateContact = async (contactId, body) => {
  if (!contactId) {
    return undefined;
  }

  if (Object.keys(body).length === 0) {
    return undefined;
  }

  const contacts = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(contacts);

  const matchedIndex = parsedData.findIndex(
    (contact) => contact.id === contactId
  );

  if (matchedIndex === -1) {
    return undefined;
  }

  parsedData[matchedIndex] = { ...parsedData[matchedIndex], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(parsedData), "utf-8");
  return parsedData[matchedIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
