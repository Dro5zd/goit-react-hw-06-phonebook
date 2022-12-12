import {Filter} from '../Filter/Filter';
import {
    ContactsAvatar,
    ContactsButton,
    ContactsItem,
    ContactsListWrapper,
    ContactsSpan,
    ContactsSpanWrapper,
    ContactsTitle,
    ContactsUl,
    DeleteIcon
} from './ContactsList.styled';
import {Notification} from '../Notification/Notification';
import {MouseEvent} from 'react';
import {useAppSelector} from '../../redux/store';


interface IContactsList {
    deleteUser: (e: MouseEvent<HTMLButtonElement>) => void
}

export const ContactsList = ({deleteUser}: IContactsList) => {

    const contacts = useAppSelector(state => state.contacts)
    const filter = useAppSelector(state => state.filter)
    const avatarCreator = (name: string) => {
        const nameSplit = name.split(' ');
        if (nameSplit.length > 1) {
            return nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase();
        } else {
            return nameSplit[0].charAt(0).toUpperCase();
        }
    };

    function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            // @ts-ignore
            .padStart(6, 0)}`;
    }

    return (
        <ContactsListWrapper>
            <ContactsTitle>Contacts</ContactsTitle>
            <Filter/>
            {contacts.length !== 0 ?
                <ContactsUl>
                    {contacts.filter(item => {
                        return item.name.toLowerCase().includes(filter);
                    })
                        .map(({id, name, phoneNumber}) => {
                            return <ContactsItem key={id}>
                                <ContactsAvatar
                                    style={{backgroundColor: getRandomHexColor()}}>{avatarCreator(name)}</ContactsAvatar>
                                <ContactsSpanWrapper>
                                    <ContactsSpan type={'name'}>{name}</ContactsSpan>
                                    <ContactsSpan type={'number'}>{phoneNumber}</ContactsSpan>
                                </ContactsSpanWrapper>
                                <ContactsButton id={id} onClick={deleteUser}><DeleteIcon/></ContactsButton>
                            </ContactsItem>;
                        })}
                </ContactsUl>
                : <Notification message="There is no contacts"/>}
        </ContactsListWrapper>
    )
        ;
}