import * as React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementType, refType } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import { MenuOwnerState, MenuProps, MenuRootSlotProps, MenuTypeMap } from './Menu.types';
import { getMenuUtilityClass } from './menuClasses';
import useMenu from '../useMenu';
import composeClasses from '../composeClasses';
import Popper from '../Popper';
import useSlotProps from '../utils/useSlotProps';
import { useClassNamesOverride } from '../utils/ClassNameConfigurator';
import { WithOptionalOwnerState } from '../utils';
import MenuProvider from '../useMenu/MenuProvider';

function useUtilityClasses(ownerState: MenuOwnerState) {
  const { open } = ownerState;
  const slots = {
    root: ['root', open && 'expanded'],
    listbox: ['listbox', open && 'expanded'],
  };

  return composeClasses(slots, useClassNamesOverride(getMenuUtilityClass));
}
/**
 *
 * Demos:
 *
 * - [Menu](https://mui.com/base/react-menu/)
 *
 * API:
 *
 * - [Menu API](https://mui.com/base/react-menu/components-api/#menu)
 */
const Menu = React.forwardRef(function Menu<RootComponentType extends React.ElementType>(
  props: MenuProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const {
    actions,
    anchorEl,
    children,
    component,
    defaultOpen,
    listboxId,
    onOpenChange,
    open: openProp,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const { contextValue, getListboxProps, dispatch, open } = useMenu({
    defaultOpen,
    open: openProp,
    onOpenChange,
    listboxId,
  });

  React.useImperativeHandle(
    actions,
    () => ({
      dispatch,
    }),
    [dispatch],
  );

  const ownerState: MenuOwnerState = { ...props, open };

  const classes = useUtilityClasses(ownerState);

  const Root = component ?? slots.root ?? Popper;
  const rootProps: WithOptionalOwnerState<MenuRootSlotProps> = useSlotProps({
    elementType: Root,
    externalForwardedProps: other,
    externalSlotProps: slotProps.root,
    additionalProps: {
      anchorEl,
      open,
      keepMounted: true,
      role: undefined,
      ref: forwardedRef,
    },
    className: classes.root,
    ownerState,
  });

  const Listbox = slots.listbox ?? 'ul';
  const listboxProps = useSlotProps({
    elementType: Listbox,
    getSlotProps: getListboxProps,
    externalSlotProps: slotProps.listbox,
    ownerState,
    className: classes.listbox,
  });

  return (
    <Root {...rootProps}>
      <Listbox {...listboxProps}>
        <MenuProvider value={contextValue}>{children}</MenuProvider>
      </Listbox>
    </Root>
  );
}) as OverridableComponent<MenuTypeMap>;

Menu.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * A ref with imperative actions.
   * It allows to select the first or last menu item.
   */
  actions: refType,
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   */
  anchorEl: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.object,
    PropTypes.func,
  ]),
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  defaultOpen: PropTypes.bool,
  /**
   * @ignore
   */
  listboxId: PropTypes.string,
  /**
   * Triggered when focus leaves the menu and the menu should close.
   */
  onOpenChange: PropTypes.func,
  /**
   * Controls whether the menu is displayed.
   * @default false
   */
  open: PropTypes.bool,
  /**
   * The props used for each slot inside the Menu.
   * @default {}
   */
  slotProps: PropTypes.shape({
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        anchorEl: PropTypes.oneOfType([
          function (props, propName) {
            if (props[propName] == null) {
              return new Error("Prop '" + propName + "' is required but wasn't specified");
            } else if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
              return new Error("Expected prop '" + propName + "' to be of type Element");
            }
          },
          PropTypes.func,
          PropTypes.shape({
            contextElement: function (props, propName) {
              if (props[propName] == null) {
                return null;
              } else if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
                return new Error("Expected prop '" + propName + "' to be of type Element");
              }
            },
            getBoundingClientRect: PropTypes.func.isRequired,
          }),
        ]),
        children: PropTypes.oneOfType([
          PropTypes.element,
          PropTypes.func,
          PropTypes.number,
          PropTypes.shape({
            '__@iterator@94': PropTypes.func.isRequired,
          }),
          PropTypes.string,
          PropTypes.bool,
        ]),
        container: PropTypes.oneOfType([
          function (props, propName) {
            if (props[propName] == null) {
              return new Error("Prop '" + propName + "' is required but wasn't specified");
            } else if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
              return new Error("Expected prop '" + propName + "' to be of type Element");
            }
          },
          PropTypes.func,
        ]),
        direction: PropTypes.oneOf(['ltr', 'rtl']),
        disablePortal: PropTypes.bool,
        keepMounted: PropTypes.bool,
        modifiers: PropTypes.arrayOf(
          PropTypes.shape({
            data: PropTypes.object,
            effect: PropTypes.func,
            enabled: PropTypes.bool,
            fn: PropTypes.func,
            name: PropTypes.any,
            options: PropTypes.object,
            phase: PropTypes.oneOf([
              'afterMain',
              'afterRead',
              'afterWrite',
              'beforeMain',
              'beforeRead',
              'beforeWrite',
              'main',
              'read',
              'write',
            ]),
            requires: PropTypes.arrayOf(PropTypes.string),
            requiresIfExists: PropTypes.arrayOf(PropTypes.string),
          }),
        ),
        open: PropTypes.bool,
        placement: PropTypes.oneOf([
          'auto-end',
          'auto-start',
          'auto',
          'bottom-end',
          'bottom-start',
          'bottom',
          'left-end',
          'left-start',
          'left',
          'right-end',
          'right-start',
          'right',
          'top-end',
          'top-start',
          'top',
        ]),
        popperOptions: PropTypes.shape({
          modifiers: PropTypes.array,
          onFirstUpdate: PropTypes.func,
          placement: PropTypes.oneOf([
            'auto-end',
            'auto-start',
            'auto',
            'bottom-end',
            'bottom-start',
            'bottom',
            'left-end',
            'left-start',
            'left',
            'right-end',
            'right-start',
            'right',
            'top-end',
            'top-start',
            'top',
          ]),
          strategy: PropTypes.oneOf(['absolute', 'fixed']),
        }),
        popperRef: PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.shape({
            current: PropTypes.object,
          }),
        ]),
        slotProps: PropTypes.shape({
          root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        }),
        slots: PropTypes.shape({
          root: PropTypes.elementType,
        }),
        transition: PropTypes.bool,
      }),
    ]),
  }),
  /**
   * The components used for each slot inside the Menu.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    listbox: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
} as any;

export default Menu;
