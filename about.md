# Now I get it
this how it work you can link by not adding md at the last name of fi
le
banner
```
// Copyright 2020 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

enum BannerDemoAction {
  reset,
  showMultipleActions,
  showLeading,
}

class BannerDemo extends StatefulWidget {
  const BannerDemo();

  @override
  _BannerDemoState createState() => _BannerDemoState();
}

class _BannerDemoState extends State<BannerDemo> {
  static const _itemCount = 20;
  var _displayBanner = true;
  var _showMultipleActions = true;
  var _showLeading = true;

  void handleDemoAction(BannerDemoAction action) {
    setState(() {
      switch (action) {
        case BannerDemoAction.reset:
          _displayBanner = true;
          _showMultipleActions = true;
          _showLeading = true;
          break;
        case BannerDemoAction.showMultipleActions:
          _showMultipleActions = !_showMultipleActions;
          break;
        case BannerDemoAction.showLeading:
          _showLeading = !_showLeading;
          break;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final banner = MaterialBanner(
      content: Text(GalleryLocalizations.of(context).bannerDemoText),
      leading: _showLeading
          ? CircleAvatar(
              child: Icon(Icons.access_alarm, color: colorScheme.onPrimary),
              backgroundColor: colorScheme.primary,
            )
          : null,
      actions: [
        FlatButton(
          child: Text(GalleryLocalizations.of(context).signIn),
          onPressed: () {
            setState(() {
              _displayBanner = false;
            });
          },
        ),
        if (_showMultipleActions)
          FlatButton(
            child: Text(GalleryLocalizations.of(context).dismiss),
            onPressed: () {
              setState(() {
                _displayBanner = false;
              });
            },
          ),
      ],
      backgroundColor: colorScheme.background,
    );

    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text(GalleryLocalizations.of(context).demoBannerTitle),
        actions: [
          PopupMenuButton<BannerDemoAction>(
            onSelected: handleDemoAction,
            itemBuilder: (context) => <PopupMenuEntry<BannerDemoAction>>[
              PopupMenuItem<BannerDemoAction>(
                value: BannerDemoAction.reset,
                child:
                    Text(GalleryLocalizations.of(context).bannerDemoResetText),
              ),
              const PopupMenuDivider(),
              CheckedPopupMenuItem<BannerDemoAction>(
                value: BannerDemoAction.showMultipleActions,
                checked: _showMultipleActions,
                child: Text(
                    GalleryLocalizations.of(context).bannerDemoMultipleText),
              ),
              CheckedPopupMenuItem<BannerDemoAction>(
                value: BannerDemoAction.showLeading,
                checked: _showLeading,
                child: Text(
                    GalleryLocalizations.of(context).bannerDemoLeadingText),
              ),
            ],
          ),
        ],
      ),
      body: ListView.builder(
          itemCount: _displayBanner ? _itemCount + 1 : _itemCount,
          itemBuilder: (context, index) {
            if (index == 0 && _displayBanner) {
              return banner;
            }
            return ListTile(
              title: Text(
                GalleryLocalizations.of(context)
                    .starterAppDrawerItem(_displayBanner ? index : index + 1),
              ),
            );
          }),
    );
  }
}
```
app bar

// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

class BottomAppBarDemo extends StatefulWidget {
  const BottomAppBarDemo();

  @override
  State createState() => _BottomAppBarDemoState();
}

class _BottomAppBarDemoState extends State<BottomAppBarDemo> {
  var _showFab = true;
  var _showNotch = true;
  var _fabLocation = FloatingActionButtonLocation.endDocked;

  void _onShowNotchChanged(bool value) {
    setState(() {
      _showNotch = value;
    });
  }

  void _onShowFabChanged(bool value) {
    setState(() {
      _showFab = value;
    });
  }

  void _onFabLocationChanged(FloatingActionButtonLocation value) {
    setState(() {
      _fabLocation = value;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text(GalleryLocalizations.of(context).demoBottomAppBarTitle),
      ),
      body: ListView(
        padding: const EdgeInsets.only(bottom: 88),
        children: [
          SwitchListTile(
            title: Text(
              GalleryLocalizations.of(context).demoFloatingButtonTitle,
            ),
            value: _showFab,
            onChanged: _onShowFabChanged,
          ),
          SwitchListTile(
            title: Text(GalleryLocalizations.of(context).bottomAppBarNotch),
            value: _showNotch,
            onChanged: _onShowNotchChanged,
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Text(GalleryLocalizations.of(context).bottomAppBarPosition),
          ),
          RadioListTile<FloatingActionButtonLocation>(
            title: Text(
              GalleryLocalizations.of(context).bottomAppBarPositionDockedEnd,
            ),
            value: FloatingActionButtonLocation.endDocked,
            groupValue: _fabLocation,
            onChanged: _onFabLocationChanged,
          ),
          RadioListTile<FloatingActionButtonLocation>(
            title: Text(
              GalleryLocalizations.of(context).bottomAppBarPositionDockedCenter,
            ),
            value: FloatingActionButtonLocation.centerDocked,
            groupValue: _fabLocation,
            onChanged: _onFabLocationChanged,
          ),
          RadioListTile<FloatingActionButtonLocation>(
            title: Text(
              GalleryLocalizations.of(context).bottomAppBarPositionFloatingEnd,
            ),
            value: FloatingActionButtonLocation.endFloat,
            groupValue: _fabLocation,
            onChanged: _onFabLocationChanged,
          ),
          RadioListTile<FloatingActionButtonLocation>(
            title: Text(
              GalleryLocalizations.of(context)
                  .bottomAppBarPositionFloatingCenter,
            ),
            value: FloatingActionButtonLocation.centerFloat,
            groupValue: _fabLocation,
            onChanged: _onFabLocationChanged,
          ),
        ],
      ),
      floatingActionButton: _showFab
          ? FloatingActionButton(
              onPressed: () {
                print('Floating action button pressed');
              },
              child: const Icon(Icons.add),
              tooltip: GalleryLocalizations.of(context).buttonTextCreate,
            )
          : null,
      floatingActionButtonLocation: _fabLocation,
      bottomNavigationBar: _DemoBottomAppBar(
        fabLocation: _fabLocation,
        shape: _showNotch ? const CircularNotchedRectangle() : null,
      ),
    );
  }
}

class _DemoBottomAppBar extends StatelessWidget {
  const _DemoBottomAppBar({
    this.fabLocation,
    this.shape,
  });

  final FloatingActionButtonLocation fabLocation;
  final NotchedShape shape;

  static final centerLocations = <FloatingActionButtonLocation>[
    FloatingActionButtonLocation.centerDocked,
    FloatingActionButtonLocation.centerFloat,
  ];

  @override
  Widget build(BuildContext context) {
    return BottomAppBar(
      shape: shape,
      child: IconTheme(
        data: IconThemeData(color: Theme.of(context).colorScheme.onPrimary),
        child: Row(
          children: [
            IconButton(
              tooltip: MaterialLocalizations.of(context).openAppDrawerTooltip,
              icon: const Icon(Icons.menu),
              onPressed: () {
                print('Menu button pressed');
              },
            ),
            if (centerLocations.contains(fabLocation)) const Spacer(),
            IconButton(
              tooltip: GalleryLocalizations.of(context).starterAppTooltipSearch,
              icon: const Icon(Icons.search),
              onPressed: () {
                print('Search button pressed');
              },
            ),
            IconButton(
              tooltip:
                  GalleryLocalizations.of(context).starterAppTooltipFavorite,
              icon: const Icon(Icons.favorite),
              onPressed: () {
                print('Favorite button pressed');
              },
            ),
          ],
        ),
      ),
    );
  }
}

#Bottom navigation

// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:animations/animations.dart';

import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

enum BottomNavigationDemoType {
  withLabels,
  withoutLabels,
}

class BottomNavigationDemo extends StatefulWidget {
  const BottomNavigationDemo({Key key, @required this.type}) : super(key: key);

  final BottomNavigationDemoType type;

  @override
  _BottomNavigationDemoState createState() => _BottomNavigationDemoState();
}

class _BottomNavigationDemoState extends State<BottomNavigationDemo> {
  int _currentIndex = 0;

  String _title(BuildContext context) {
    switch (widget.type) {
      case BottomNavigationDemoType.withLabels:
        return GalleryLocalizations.of(context)
            .demoBottomNavigationPersistentLabels;
      case BottomNavigationDemoType.withoutLabels:
        return GalleryLocalizations.of(context)
            .demoBottomNavigationSelectedLabel;
    }
    return '';
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final textTheme = Theme.of(context).textTheme;

    var bottomNavigationBarItems = <BottomNavigationBarItem>[
      BottomNavigationBarItem(
        icon: const Icon(Icons.add_comment),
        label: GalleryLocalizations.of(context).bottomNavigationCommentsTab,
      ),
      BottomNavigationBarItem(
        icon: const Icon(Icons.calendar_today),
        label: GalleryLocalizations.of(context).bottomNavigationCalendarTab,
      ),
      BottomNavigationBarItem(
        icon: const Icon(Icons.account_circle),
        label: GalleryLocalizations.of(context).bottomNavigationAccountTab,
      ),
      BottomNavigationBarItem(
        icon: const Icon(Icons.alarm_on),
        label: GalleryLocalizations.of(context).bottomNavigationAlarmTab,
      ),
      BottomNavigationBarItem(
        icon: const Icon(Icons.camera_enhance),
        label: GalleryLocalizations.of(context).bottomNavigationCameraTab,
      ),
    ];

    if (widget.type == BottomNavigationDemoType.withLabels) {
      bottomNavigationBarItems = bottomNavigationBarItems.sublist(
          0, bottomNavigationBarItems.length - 2);
      _currentIndex =
          _currentIndex.clamp(0, bottomNavigationBarItems.length - 1).toInt();
    }

    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text(_title(context)),
      ),
      body: Center(
        child: PageTransitionSwitcher(
          child: _NavigationDestinationView(
            // Adding [UniqueKey] to make sure the widget rebuilds when transitioning.
            key: UniqueKey(),
            item: bottomNavigationBarItems[_currentIndex],
          ),
          transitionBuilder: (child, animation, secondaryAnimation) {
            return FadeThroughTransition(
              child: child,
              animation: animation,
              secondaryAnimation: secondaryAnimation,
            );
          },
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        showUnselectedLabels:
            widget.type == BottomNavigationDemoType.withLabels,
        items: bottomNavigationBarItems,
        currentIndex: _currentIndex,
        type: BottomNavigationBarType.fixed,
        selectedFontSize: textTheme.caption.fontSize,
        unselectedFontSize: textTheme.caption.fontSize,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        selectedItemColor: colorScheme.onPrimary,
        unselectedItemColor: colorScheme.onPrimary.withOpacity(0.38),
        backgroundColor: colorScheme.primary,
      ),
    );
  }
}

class _NavigationDestinationView extends StatelessWidget {
  _NavigationDestinationView({Key key, this.item}) : super(key: key);

  final BottomNavigationBarItem item;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ExcludeSemantics(
          child: Center(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.asset(
                  'assets/demos/bottom_navigation_background.png',
                  package: 'flutter_gallery_assets',
                ),
              ),
            ),
          ),
        ),
        Center(
          child: IconTheme(
            data: const IconThemeData(
              color: Colors.white,
              size: 80,
            ),
            child: Semantics(
              label: GalleryLocalizations.of(context)
                  .bottomNavigationContentPlaceholder(
                // ignore: deprecated_member_use
                item.title,
              ),
              child: item.icon,
            ),
          ),
        ),
      ],
    );
  }
}

#bottom sheet
// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';

import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

class _BottomSheetContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 300,
      child: Column(
        children: [
          Container(
            height: 70,
            child: Center(
              child: Text(
                GalleryLocalizations.of(context).demoBottomSheetHeader,
                textAlign: TextAlign.center,
              ),
            ),
          ),
          const Divider(thickness: 1),
          Expanded(
            child: ListView.builder(
              itemCount: 21,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(GalleryLocalizations.of(context)
                      .demoBottomSheetItem(index)),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _PersistentBottomSheetDemo extends StatefulWidget {
  @override
  _PersistentBottomSheetDemoState createState() =>
      _PersistentBottomSheetDemoState();
}

class _PersistentBottomSheetDemoState
    extends State<_PersistentBottomSheetDemo> {
  VoidCallback _showBottomSheetCallback;

  @override
  void initState() {
    super.initState();
    _showBottomSheetCallback = _showPersistentBottomSheet;
  }

  void _showPersistentBottomSheet() {
    setState(() {
      // Disable the show bottom sheet button.
      _showBottomSheetCallback = null;
    });

    Scaffold.of(context)
        .showBottomSheet<void>(
          (context) {
            return _BottomSheetContent();
          },
          elevation: 25,
        )
        .closed
        .whenComplete(() {
          if (mounted) {
            setState(() {
              // Re-enable the bottom sheet button.
              _showBottomSheetCallback = _showPersistentBottomSheet;
            });
          }
        });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: RaisedButton(
        onPressed: _showBottomSheetCallback,
        child: Text(GalleryLocalizations.of(context).demoBottomSheetButtonText),
      ),
    );
  }
}

#butons
// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';

import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

class _FlatButtonDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          FlatButton(
            child: Text(GalleryLocalizations.of(context).buttonText),
            onPressed: () {},
          ),
          const SizedBox(height: 12),
          FlatButton.icon(
            icon: const Icon(Icons.add, size: 18),
            label: Text(GalleryLocalizations.of(context).buttonText),
            onPressed: () {},
          ),
        ],
      ),
    );
  }
}

#cards
// Copyright 2020 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

enum CardType {
  standard,
  tappable,
  selectable,
}

class TravelDestination {
  const TravelDestination({
    @required this.assetName,
    @required this.assetPackage,
    @required this.title,
    @required this.description,
    @required this.city,
    @required this.location,
    this.cardType = CardType.standard,
  })  : assert(assetName != null),
        assert(assetPackage != null),
        assert(title != null),
        assert(description != null),
        assert(city != null),
        assert(location != null);

  final String assetName;
  final String assetPackage;
  final String title;
  final String description;
  final String city;
  final String location;
  final CardType cardType;
}

List<TravelDestination> destinations(BuildContext context) => [
      TravelDestination(
        assetName: 'places/india_thanjavur_market.png',
        assetPackage: _kGalleryAssetsPackage,
        title:
            GalleryLocalizations.of(context).cardsDemoTravelDestinationTitle1,
        description: GalleryLocalizations.of(context)
            .cardsDemoTravelDestinationDescription1,
        city: GalleryLocalizations.of(context).cardsDemoTravelDestinationCity1,
        location: GalleryLocalizations.of(context)
            .cardsDemoTravelDestinationLocation1,
      ),
      TravelDestination(
        assetName: 'places/india_chettinad_silk_maker.png',
        assetPackage: _kGalleryAssetsPackage,
        title:
            GalleryLocalizations.of(context).cardsDemoTravelDestinationTitle2,
        description: GalleryLocalizations.of(context)
            .cardsDemoTravelDestinationDescription2,
        city: GalleryLocalizations.of(context).cardsDemoTravelDestinationCity2,
        location: GalleryLocalizations.of(context)
            .cardsDemoTravelDestinationLocation2,
        cardType: CardType.tappable,
      ),
      TravelDestination(
        assetName: 'places/india_tanjore_thanjavur_temple.png',
        assetPackage: _kGalleryAssetsPackage,
        title:
            GalleryLocalizations.of(context).cardsDemoTravelDestinationTitle3,
        description: GalleryLocalizations.of(context)
            .cardsDemoTravelDestinationDescription3,
        city: GalleryLocalizations.of(context).cardsDemoTravelDestinationCity1,
        location: GalleryLocalizations.of(context)
            .cardsDemoTravelDestinationLocation1,
        cardType: CardType.selectable,
      ),
    ];

class TravelDestinationItem extends StatelessWidget {
  const TravelDestinationItem({Key key, @required this.destination, this.shape})
      : assert(destination != null),
        super(key: key);

  // This height will allow for all the Card's content to fit comfortably within the card.
  static const height = 360.0;
  final TravelDestination destination;
  final ShapeBorder shape;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: false,
      bottom: false,
      child: Padding(
        padding: const EdgeInsets.all(8),
        child: Column(
          children: [
            SectionTitle(
                title:
                    GalleryLocalizations.of(context).settingsTextScalingNormal),
            SizedBox(
              height: height,
              child: Card(
                // This ensures that the Card's children are clipped correctly.
                clipBehavior: Clip.antiAlias,
                shape: shape,
                child: TravelDestinationContent(destination: destination),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class TappableTravelDestinationItem extends StatelessWidget {
  const TappableTravelDestinationItem(
      {Key key, @required this.destination, this.shape})
      : assert(destination != null),
        super(key: key);

  // This height will allow for all the Card's content to fit comfortably within the card.
  static const height = 298.0;
  final TravelDestination destination;
  final ShapeBorder shape;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: false,
      bottom: false,
      child: Padding(
        padding: const EdgeInsets.all(8),
        child: Column(
          children: [
            SectionTitle(
                title: GalleryLocalizations.of(context).cardsDemoTappable),
            SizedBox(
              height: height,
              child: Card(
                // This ensures that the Card's children (including the ink splash) are clipped correctly.
                clipBehavior: Clip.antiAlias,
                shape: shape,
                child: InkWell(
                  onTap: () {
                    print('Card was tapped');
                  },
                  // Generally, material cards use onSurface with 12% opacity for the pressed state.
                  splashColor:
                      Theme.of(context).colorScheme.onSurface.withOpacity(0.12),
                  // Generally, material cards do not have a highlight overlay.
                  highlightColor: Colors.transparent,
                  child: TravelDestinationContent(destination: destination),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class SelectableTravelDestinationItem extends StatefulWidget {
  const SelectableTravelDestinationItem(
      {Key key, @required this.destination, this.shape})
      : assert(destination != null),
        super(key: key);

  final TravelDestination destination;
  final ShapeBorder shape;

  @override
  _SelectableTravelDestinationItemState createState() =>
      _SelectableTravelDestinationItemState();
}

class _SelectableTravelDestinationItemState
    extends State<SelectableTravelDestinationItem> {
  // This height will allow for all the Card's content to fit comfortably within the card.
  static const height = 298.0;
  var _isSelected = false;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return SafeArea(
      top: false,
      bottom: false,
      child: Padding(
        padding: const EdgeInsets.all(8),
        child: Column(
          children: [
            SectionTitle(
                title: GalleryLocalizations.of(context).cardsDemoSelectable),
            SizedBox(
              height: height,
              child: Card(
                // This ensures that the Card's children (including the ink splash) are clipped correctly.
                clipBehavior: Clip.antiAlias,
                shape: widget.shape,
                child: InkWell(
                  onLongPress: () {
                    print('Selectable card state changed');
                    setState(() {
                      _isSelected = !_isSelected;
                    });
                  },
                  // Generally, material cards use onSurface with 12% opacity for the pressed state.
                  splashColor: colorScheme.onSurface.withOpacity(0.12),
                  // Generally, material cards do not have a highlight overlay.
                  highlightColor: Colors.transparent,
                  child: Stack(
                    children: [
                      Container(
                        color: _isSelected
                            // Generally, material cards use primary with 8% opacity for the selected state.
                            // See: https://material.io/design/interaction/states.html#anatomy
                            ? colorScheme.primary.withOpacity(0.08)
                            : Colors.transparent,
                      ),
                      TravelDestinationContent(destination: widget.destination),
                      Align(
                        alignment: Alignment.topRight,
                        child: Padding(
                          padding: const EdgeInsets.all(8),
                          child: Icon(
                            Icons.check_circle,
                            color: _isSelected
                                ? colorScheme.primary
                                : Colors.transparent,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class SectionTitle extends StatelessWidget {
  const SectionTitle({
    Key key,
    this.title,
  }) : super(key: key);

  final String title;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(4, 4, 4, 12),
      child: Align(
        alignment: Alignment.centerLeft,
        child: Text(title, style: Theme.of(context).textTheme.subtitle1),
      ),
    );
  }
}

class TravelDestinationContent extends StatelessWidget {
  const TravelDestinationContent({Key key, @required this.destination})
      : assert(destination != null),
        super(key: key);

  final TravelDestination destination;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final titleStyle = theme.textTheme.headline5.copyWith(color: Colors.white);
    final descriptionStyle = theme.textTheme.subtitle1;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          height: 184,
          child: Stack(
            children: [
              Positioned.fill(
                // In order to have the ink splash appear above the image, you
                // must use Ink.image. This allows the image to be painted as
                // part of the Material and display ink effects above it. Using
                // a standard Image will obscure the ink splash.
                child: Ink.image(
                  image: AssetImage(
                    destination.assetName,
                    package: destination.assetPackage,
                  ),
                  fit: BoxFit.cover,
                  child: Container(),
                ),
              ),
              Positioned(
                bottom: 16,
                left: 16,
                right: 16,
                child: FittedBox(
                  fit: BoxFit.scaleDown,
                  alignment: Alignment.centerLeft,
                  child: Text(
                    destination.title,
                    style: titleStyle,
                  ),
                ),
              ),
            ],
          ),
        ),
        // Description and share/explore buttons.
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
          child: DefaultTextStyle(
            softWrap: false,
            overflow: TextOverflow.ellipsis,
            style: descriptionStyle,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // This array contains the three line description on each card
                // demo.
                Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Text(
                    destination.description,
                    style: descriptionStyle.copyWith(color: Colors.black54),
                  ),
                ),
                Text(destination.city),
                Text(destination.location),
              ],
            ),
          ),
        ),
        if (destination.cardType == CardType.standard)
          // share, explore buttons
          ButtonBar(
            alignment: MainAxisAlignment.start,
            children: [
              FlatButton(
                child: Text(GalleryLocalizations.of(context).demoMenuShare,
                    semanticsLabel: GalleryLocalizations.of(context)
                        .cardsDemoShareSemantics(destination.title)),
                textColor: Colors.amber.shade500,
                onPressed: () {
                  print('pressed');
                },
              ),
              FlatButton(
                child: Text(GalleryLocalizations.of(context).cardsDemoExplore,
                    semanticsLabel: GalleryLocalizations.of(context)
                        .cardsDemoExploreSemantics(destination.title)),
                textColor: Colors.amber.shade500,
                onPressed: () {
                  print('pressed');
                },
              ),
            ],
          ),
      ],
    );
  }
}

class CardsDemo extends StatefulWidget {
  const CardsDemo();

  @override
  _CardsDemoState createState() => _CardsDemoState();
}

class _CardsDemoState extends State<CardsDemo> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text(GalleryLocalizations.of(context).demoCardTitle),
      ),
      body: Scrollbar(
        child: ListView(
          padding: const EdgeInsets.only(top: 8, left: 8, right: 8),
          children: [
            for (final destination in destinations(context))
              Container(
                margin: const EdgeInsets.only(bottom: 8),
                child: (destination.cardType == CardType.standard)
                    ? TravelDestinationItem(destination: destination)
                    : destination.cardType == CardType.tappable
                        ? TappableTravelDestinationItem(
                            destination: destination)
                        : SelectableTravelDestinationItem(
                            destination: destination),
              ),
          ],
        ),
      ),
    );
  }
}

#chips
// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

class _ActionChipDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ActionChip(
        onPressed: () {},
        avatar: const Icon(
          Icons.brightness_5,
          color: Colors.black54,
        ),
        label: Text(GalleryLocalizations.of(context).chipTurnOnLights),
      ),
    );
  }
}

#data tables
// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:gallery/data/gallery_options.dart';
import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';
import 'package:intl/intl.dart';

class DataTableDemo extends StatefulWidget {
  const DataTableDemo();

  @override
  _DataTableDemoState createState() => _DataTableDemoState();
}

class _DataTableDemoState extends State<DataTableDemo> {
  int _rowsPerPage = PaginatedDataTable.defaultRowsPerPage;
  int _sortColumnIndex;
  bool _sortAscending = true;
  _DessertDataSource _dessertsDataSource;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _dessertsDataSource ??= _DessertDataSource(context);
  }

  void _sort<T>(
    Comparable<T> Function(_Dessert d) getField,
    int columnIndex,
    bool ascending,
  ) {
    _dessertsDataSource._sort<T>(getField, ascending);
    setState(() {
      _sortColumnIndex = columnIndex;
      _sortAscending = ascending;
    });
  }

  @override
  Widget build(BuildContext context) {
    final localizations = GalleryLocalizations.of(context);
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text(localizations.demoDataTableTitle),
      ),
      body: Scrollbar(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            PaginatedDataTable(
              header: Text(localizations.dataTableHeader),
              rowsPerPage: _rowsPerPage,
              onRowsPerPageChanged: (value) {
                setState(() {
                  _rowsPerPage = value;
                });
              },
              sortColumnIndex: _sortColumnIndex,
              sortAscending: _sortAscending,
              onSelectAll: _dessertsDataSource._selectAll,
              columns: [
                DataColumn(
                  label: Text(localizations.dataTableColumnDessert),
                  onSort: (columnIndex, ascending) =>
                      _sort<String>((d) => d.name, columnIndex, ascending),
                ),
                DataColumn(
                  label: Text(localizations.dataTableColumnCalories),
                  numeric: true,
                  onSort: (columnIndex, ascending) =>
                      _sort<num>((d) => d.calories, columnIndex, ascending),
                ),
                DataColumn(
                  label: Text(localizations.dataTableColumnFat),
                  numeric: true,
                  onSort: (columnIndex, ascending) =>
                      _sort<num>((d) => d.fat, columnIndex, ascending),
                ),
                DataColumn(
                  label: Text(localizations.dataTableColumnCarbs),
                  numeric: true,
                  onSort: (columnIndex, ascending) =>
                      _sort<num>((d) => d.carbs, columnIndex, ascending),
                ),
                DataColumn(
                  label: Text(localizations.dataTableColumnProtein),
                  numeric: true,
                  onSort: (columnIndex, ascending) =>
                      _sort<num>((d) => d.protein, columnIndex, ascending),
                ),
                DataColumn(
                  label: Text(localizations.dataTableColumnSodium),
                  numeric: true,
                  onSort: (columnIndex, ascending) =>
                      _sort<num>((d) => d.sodium, columnIndex, ascending),
                ),
                DataColumn(
                  label: Text(localizations.dataTableColumnCalcium),
                  numeric: true,
                  onSort: (columnIndex, ascending) =>
                      _sort<num>((d) => d.calcium, columnIndex, ascending),
                ),
                DataColumn(
                  label: Text(localizations.dataTableColumnIron),
                  numeric: true,
                  onSort: (columnIndex, ascending) =>
                      _sort<num>((d) => d.iron, columnIndex, ascending),
                ),
              ],
              source: _dessertsDataSource,
            ),
          ],
        ),
      ),
    );
  }
}

class _Dessert {
  _Dessert(this.name, this.calories, this.fat, this.carbs, this.protein,
      this.sodium, this.calcium, this.iron);
  final String name;
  final int calories;
  final double fat;
  final int carbs;
  final double protein;
  final int sodium;
  final int calcium;
  final int iron;

  bool selected = false;
}

class _DessertDataSource extends DataTableSource {
  _DessertDataSource(this.context) {
    final localizations = GalleryLocalizations.of(context);
    _desserts = <_Dessert>[
      _Dessert(
        localizations.dataTableRowFrozenYogurt,
        159,
        6.0,
        24,
        4.0,
        87,
        14,
        1,
      ),
      _Dessert(
        localizations.dataTableRowIceCreamSandwich,
        237,
        9.0,
        37,
        4.3,
        129,
        8,
        1,
      ),
      _Dessert(
        localizations.dataTableRowEclair,
        262,
        16.0,
        24,
        6.0,
        337,
        6,
        7,
      ),
      _Dessert(
        localizations.dataTableRowCupcake,
        305,
        3.7,
        67,
        4.3,
        413,
        3,
        8,
      ),
      _Dessert(
        localizations.dataTableRowGingerbread,
        356,
        16.0,
        49,
        3.9,
        327,
        7,
        16,
      ),
      _Dessert(
        localizations.dataTableRowJellyBean,
        375,
        0.0,
        94,
        0.0,
        50,
        0,
        0,
      ),
      _Dessert(
        localizations.dataTableRowLollipop,
        392,
        0.2,
        98,
        0.0,
        38,
        0,
        2,
      ),
      _Dessert(
        localizations.dataTableRowHoneycomb,
        408,
        3.2,
        87,
        6.5,
        562,
        0,
        45,
      ),
      _Dessert(
        localizations.dataTableRowDonut,
        452,
        25.0,
        51,
        4.9,
        326,
        2,
        22,
      ),
      _Dessert(
        localizations.dataTableRowApplePie,
        518,
        26.0,
        65,
        7.0,
        54,
        12,
        6,
      ),
      _Dessert(
        localizations.dataTableRowWithSugar(
          localizations.dataTableRowFrozenYogurt,
        ),
        168,
        6.0,
        26,
        4.0,
        87,
        14,
        1,
      ),
      _Dessert(
        localizations.dataTableRowWithSugar(
          localizations.dataTableRowIceCreamSandwich,
        ),
        246,
        9.0,
        39,
        4.3,
        129,
        8,
        1,
      ),
      _Dessert(
        localizations.dataTableRowWithSugar(
          localizations.dataTableRowEclair,
        ),
        271,
        16.0,
        26,
        6.0,
        337,
        6,
        7,
      ),
      _Dessert(
        localizations.dataTableRowWithSugar(
          localizations.dataTableRowCupcake,
        ),
        314,
        3.7,
        69,
        4.3,
        413,
        3,
        8,
      ),
      _Dessert(
        localizations.dataTableRowWithSugar(
          localizations.dataTableRowGingerbread,
        ),
        345,
        16.0,
        51,
        3.9,
        327,
        7,
        16,
      ),
      _Dessert(
        localizations.dataTableRowWithSugar(
          localizations.dataTableRowJellyBean,
        ),
        364,
        0.0,
        96,
        0.0,
        50,
        0,
        0,
      ),
      _Dessert(
        localizations.dataTableRowWithSugar(
          localizations.dataTableRowLollipop,
        ),
        401,
        0.2,
        100,
        0.0,
        38,
        0,
        2,
      ),
      _Dessert(
        localizations.dataTableRowWithSugar(
          localizations.dataTableRowHoneycomb,
        ),
        417,
        3.2,
        89,
        6.5,
        562,
        0,
        45,
      ),
      _Dessert(
        localizations.dataTableRowWithSugar(
          localizations.dataTableRowDonut,
        ),
        461,
        25.0,
        53,
        4.9,
        326,
        2,
        22,
      ),
      _Dessert(
        localizations.dataTableRowWithSugar(
          localizations.dataTableRowApplePie,
        ),
        527,
        26.0,
        67,
        7.0,
        54,
        12,
        6,
      ),
      _Dessert(
        localizations.dataTableRowWithHoney(
          localizations.dataTableRowFrozenYogurt,
        ),
        223,
        6.0,
        36,
        4.0,
        87,
        14,
        1,
      ),
      _Dessert(
        localizations.dataTableRowWithHoney(
          localizations.dataTableRowIceCreamSandwich,
        ),
        301,
        9.0,
        49,
        4.3,
        129,
        8,
        1,
      ),
      _Dessert(
        localizations.dataTableRowWithHoney(
          localizations.dataTableRowEclair,
        ),
        326,
        16.0,
        36,
        6.0,
        337,
        6,
        7,
      ),
      _Dessert(
        localizations.dataTableRowWithHoney(
          localizations.dataTableRowCupcake,
        ),
        369,
        3.7,
        79,
        4.3,
        413,
        3,
        8,
      ),
      _Dessert(
        localizations.dataTableRowWithHoney(
          localizations.dataTableRowGingerbread,
        ),
        420,
        16.0,
        61,
        3.9,
        327,
        7,
        16,
      ),
      _Dessert(
        localizations.dataTableRowWithHoney(
          localizations.dataTableRowJellyBean,
        ),
        439,
        0.0,
        106,
        0.0,
        50,
        0,
        0,
      ),
      _Dessert(
        localizations.dataTableRowWithHoney(
          localizations.dataTableRowLollipop,
        ),
        456,
        0.2,
        110,
        0.0,
        38,
        0,
        2,
      ),
      _Dessert(
        localizations.dataTableRowWithHoney(
          localizations.dataTableRowHoneycomb,
        ),
        472,
        3.2,
        99,
        6.5,
        562,
        0,
        45,
      ),
      _Dessert(
        localizations.dataTableRowWithHoney(
          localizations.dataTableRowDonut,
        ),
        516,
        25.0,
        63,
        4.9,
        326,
        2,
        22,
      ),
      _Dessert(
        localizations.dataTableRowWithHoney(
          localizations.dataTableRowApplePie,
        ),
        582,
        26.0,
        77,
        7.0,
        54,
        12,
        6,
      ),
    ];
  }

  final BuildContext context;
  List<_Dessert> _desserts;

  void _sort<T>(Comparable<T> Function(_Dessert d) getField, bool ascending) {
    _desserts.sort((a, b) {
      final aValue = getField(a);
      final bValue = getField(b);
      return ascending
          ? Comparable.compare(aValue, bValue)
          : Comparable.compare(bValue, aValue);
    });
    notifyListeners();
  }

  int _selectedCount = 0;

  @override
  DataRow getRow(int index) {
    final format = NumberFormat.decimalPercentPattern(
      locale: GalleryOptions.of(context).locale.toString(),
      decimalDigits: 0,
    );
    assert(index >= 0);
    if (index >= _desserts.length) return null;
    final dessert = _desserts[index];
    return DataRow.byIndex(
      index: index,
      selected: dessert.selected,
      onSelectChanged: (value) {
        if (dessert.selected != value) {
          _selectedCount += value ? 1 : -1;
          assert(_selectedCount >= 0);
          dessert.selected = value;
          notifyListeners();
        }
      },
      cells: [
        DataCell(Text(dessert.name)),
        DataCell(Text('${dessert.calories}')),
        DataCell(Text(dessert.fat.toStringAsFixed(1))),
        DataCell(Text('${dessert.carbs}')),
        DataCell(Text(dessert.protein.toStringAsFixed(1))),
        DataCell(Text('${dessert.sodium}')),
        DataCell(Text('${format.format(dessert.calcium / 100)}')),
        DataCell(Text('${format.format(dessert.iron / 100)}')),
      ],
    );
  }

  @override
  int get rowCount => _desserts.length;

  @override
  bool get isRowCountApproximate => false;

  @override
  int get selectedRowCount => _selectedCount;

  void _selectAll(bool checked) {
    for (final dessert in _desserts) {
      dessert.selected = checked;
    }
    _selectedCount = checked ? _desserts.length : 0;
    notifyListeners();
  }
}

#dialogs

// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';

import 'package:gallery/data/gallery_options.dart';
import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

enum DialogDemoType {
  alert,
  alertTitle,
  simple,
  fullscreen,
}

class DialogDemo extends StatelessWidget {
  DialogDemo({Key key, @required this.type}) : super(key: key);

  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final DialogDemoType type;

  String _title(BuildContext context) {
    switch (type) {
      case DialogDemoType.alert:
        return GalleryLocalizations.of(context).demoAlertDialogTitle;
      case DialogDemoType.alertTitle:
        return GalleryLocalizations.of(context).demoAlertTitleDialogTitle;
      case DialogDemoType.simple:
        return GalleryLocalizations.of(context).demoSimpleDialogTitle;
      case DialogDemoType.fullscreen:
        return GalleryLocalizations.of(context).demoFullscreenDialogTitle;
    }
    return '';
  }

  Future<void> _showDemoDialog<T>({BuildContext context, Widget child}) async {
    child = ApplyTextOptions(
      child: Theme(
        data: Theme.of(context),
        child: child,
      ),
    );
    final value = await showDialog<T>(
      context: context,
      builder: (context) => child,
    );
    // The value passed to Navigator.pop() or null.
    if (value != null && value is String) {
      _scaffoldKey.currentState.hideCurrentSnackBar();
      _scaffoldKey.currentState.showSnackBar(SnackBar(
        content:
            Text(GalleryLocalizations.of(context).dialogSelectedOption(value)),
      ));
    }
  }

  void _showAlertDialog(BuildContext context) {
    final theme = Theme.of(context);
    final dialogTextStyle = theme.textTheme.subtitle1
        .copyWith(color: theme.textTheme.caption.color);
    _showDemoDialog<String>(
      context: context,
      child: AlertDialog(
        content: Text(
          GalleryLocalizations.of(context).dialogDiscardTitle,
          style: dialogTextStyle,
        ),
        actions: [
          _DialogButton(text: GalleryLocalizations.of(context).dialogCancel),
          _DialogButton(text: GalleryLocalizations.of(context).dialogDiscard),
        ],
      ),
    );
  }

  void _showAlertDialogWithTitle(BuildContext context) {
    final theme = Theme.of(context);
    final dialogTextStyle = theme.textTheme.subtitle1
        .copyWith(color: theme.textTheme.caption.color);
    _showDemoDialog<String>(
      context: context,
      child: AlertDialog(
        title: Text(GalleryLocalizations.of(context).dialogLocationTitle),
        content: Text(
          GalleryLocalizations.of(context).dialogLocationDescription,
          style: dialogTextStyle,
        ),
        actions: [
          _DialogButton(text: GalleryLocalizations.of(context).dialogDisagree),
          _DialogButton(text: GalleryLocalizations.of(context).dialogAgree),
        ],
      ),
    );
  }

  void _showSimpleDialog(BuildContext context) {
    final theme = Theme.of(context);
    _showDemoDialog<String>(
      context: context,
      child: SimpleDialog(
        title: Text(GalleryLocalizations.of(context).dialogSetBackup),
        children: [
          _DialogDemoItem(
            icon: Icons.account_circle,
            color: theme.colorScheme.primary,
            text: 'username@gmail.com',
          ),
          _DialogDemoItem(
            icon: Icons.account_circle,
            color: theme.colorScheme.secondary,
            text: 'user02@gmail.com',
          ),
          _DialogDemoItem(
            icon: Icons.add_circle,
            text: GalleryLocalizations.of(context).dialogAddAccount,
            color: theme.disabledColor,
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Navigator(
      // Adding [ValueKey] to make sure that the widget gets rebuilt when
      // changing type.
      key: ValueKey(type),
      onGenerateRoute: (settings) {
        return _NoAnimationMaterialPageRoute<void>(
          builder: (context) => Scaffold(
            key: _scaffoldKey,
            appBar: AppBar(
              automaticallyImplyLeading: false,
              title: Text(_title(context)),
            ),
            body: Center(
              child: RaisedButton(
                child: Text(GalleryLocalizations.of(context).dialogShow),
                onPressed: () {
                  switch (type) {
                    case DialogDemoType.alert:
                      _showAlertDialog(context);
                      break;
                    case DialogDemoType.alertTitle:
                      _showAlertDialogWithTitle(context);
                      break;
                    case DialogDemoType.simple:
                      _showSimpleDialog(context);
                      break;
                    case DialogDemoType.fullscreen:
                      Navigator.push<void>(
                        context,
                        MaterialPageRoute(
                          builder: (context) => _FullScreenDialogDemo(),
                          fullscreenDialog: true,
                        ),
                      );
                      break;
                  }
                },
              ),
            ),
          ),
        );
      },
    );
  }
}

/// A MaterialPageRoute without any transition animations.
class _NoAnimationMaterialPageRoute<T> extends MaterialPageRoute<T> {
  _NoAnimationMaterialPageRoute({
    @required WidgetBuilder builder,
    RouteSettings settings,
    bool maintainState = true,
    bool fullscreenDialog = false,
  }) : super(
            builder: builder,
            maintainState: maintainState,
            settings: settings,
            fullscreenDialog: fullscreenDialog);

  @override
  Widget buildTransitions(BuildContext context, Animation<double> animation,
      Animation<double> secondaryAnimation, Widget child) {
    return child;
  }
}

class _DialogButton extends StatelessWidget {
  const _DialogButton({Key key, this.text}) : super(key: key);

  final String text;

  @override
  Widget build(BuildContext context) {
    return FlatButton(
      child: Text(text),
      onPressed: () {
        Navigator.of(context, rootNavigator: true).pop(text);
      },
    );
  }
}

class _DialogDemoItem extends StatelessWidget {
  const _DialogDemoItem({
    Key key,
    this.icon,
    this.color,
    this.text,
  }) : super(key: key);

  final IconData icon;
  final Color color;
  final String text;

  @override
  Widget build(BuildContext context) {
    return SimpleDialogOption(
      onPressed: () {
        Navigator.of(context, rootNavigator: true).pop(text);
      },
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Icon(icon, size: 36, color: color),
          Flexible(
            child: Padding(
              padding: const EdgeInsetsDirectional.only(start: 16),
              child: Text(text),
            ),
          ),
        ],
      ),
    );
  }
}

class _FullScreenDialogDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    // Remove the MediaQuery padding because the demo is rendered inside of a
    // different page that already accounts for this padding.
    return MediaQuery.removePadding(
      context: context,
      removeTop: true,
      removeBottom: true,
      child: ApplyTextOptions(
        child: Scaffold(
          appBar: AppBar(
            title: Text(GalleryLocalizations.of(context).dialogFullscreenTitle),
            actions: [
              FlatButton(
                child: Text(
                  GalleryLocalizations.of(context).dialogFullscreenSave,
                  style: theme.textTheme.bodyText2.copyWith(
                    color: theme.colorScheme.onPrimary,
                  ),
                ),
                onPressed: () {
                  Navigator.pop(context);
                },
              ),
            ],
          ),
          body: Center(
            child: Text(
              GalleryLocalizations.of(context).dialogFullscreenDescription,
            ),
          ),
        ),
      ),
    );
  }
}

#gridlist
// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

enum GridListDemoType {
  imageOnly,
  header,
  footer,
}

class GridListDemo extends StatelessWidget {
  const GridListDemo({Key key, this.type}) : super(key: key);

  final GridListDemoType type;

  List<_Photo> _photos(BuildContext context) {
    return [
      _Photo(
        assetName: 'places/india_chennai_flower_market.png',
        title: GalleryLocalizations.of(context).placeChennai,
        subtitle: GalleryLocalizations.of(context).placeFlowerMarket,
      ),
      _Photo(
        assetName: 'places/india_tanjore_bronze_works.png',
        title: GalleryLocalizations.of(context).placeTanjore,
        subtitle: GalleryLocalizations.of(context).placeBronzeWorks,
      ),
      _Photo(
        assetName: 'places/india_tanjore_market_merchant.png',
        title: GalleryLocalizations.of(context).placeTanjore,
        subtitle: GalleryLocalizations.of(context).placeMarket,
      ),
      _Photo(
        assetName: 'places/india_tanjore_thanjavur_temple.png',
        title: GalleryLocalizations.of(context).placeTanjore,
        subtitle: GalleryLocalizations.of(context).placeThanjavurTemple,
      ),
      _Photo(
        assetName: 'places/india_tanjore_thanjavur_temple_carvings.png',
        title: GalleryLocalizations.of(context).placeTanjore,
        subtitle: GalleryLocalizations.of(context).placeThanjavurTemple,
      ),
      _Photo(
        assetName: 'places/india_pondicherry_salt_farm.png',
        title: GalleryLocalizations.of(context).placePondicherry,
        subtitle: GalleryLocalizations.of(context).placeSaltFarm,
      ),
      _Photo(
        assetName: 'places/india_chennai_highway.png',
        title: GalleryLocalizations.of(context).placeChennai,
        subtitle: GalleryLocalizations.of(context).placeScooters,
      ),
      _Photo(
        assetName: 'places/india_chettinad_silk_maker.png',
        title: GalleryLocalizations.of(context).placeChettinad,
        subtitle: GalleryLocalizations.of(context).placeSilkMaker,
      ),
      _Photo(
        assetName: 'places/india_chettinad_produce.png',
        title: GalleryLocalizations.of(context).placeChettinad,
        subtitle: GalleryLocalizations.of(context).placeLunchPrep,
      ),
      _Photo(
        assetName: 'places/india_tanjore_market_technology.png',
        title: GalleryLocalizations.of(context).placeTanjore,
        subtitle: GalleryLocalizations.of(context).placeMarket,
      ),
      _Photo(
        assetName: 'places/india_pondicherry_beach.png',
        title: GalleryLocalizations.of(context).placePondicherry,
        subtitle: GalleryLocalizations.of(context).placeBeach,
      ),
      _Photo(
        assetName: 'places/india_pondicherry_fisherman.png',
        title: GalleryLocalizations.of(context).placePondicherry,
        subtitle: GalleryLocalizations.of(context).placeFisherman,
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text(GalleryLocalizations.of(context).demoGridListsTitle),
      ),
      body: GridView.count(
        crossAxisCount: 2,
        mainAxisSpacing: 8,
        crossAxisSpacing: 8,
        padding: const EdgeInsets.all(8),
        childAspectRatio: 1,
        children: _photos(context).map<Widget>((photo) {
          return _GridDemoPhotoItem(
            photo: photo,
            tileStyle: type,
          );
        }).toList(),
      ),
    );
  }
}

class _Photo {
  _Photo({
    this.assetName,
    this.title,
    this.subtitle,
  });

  final String assetName;
  final String title;
  final String subtitle;
}

/// Allow the text size to shrink to fit in the space
class _GridTitleText extends StatelessWidget {
  const _GridTitleText(this.text);

  final String text;

  @override
  Widget build(BuildContext context) {
    return FittedBox(
      fit: BoxFit.scaleDown,
      alignment: AlignmentDirectional.centerStart,
      child: Text(text),
    );
  }
}

class _GridDemoPhotoItem extends StatelessWidget {
  _GridDemoPhotoItem({
    Key key,
    @required this.photo,
    @required this.tileStyle,
  }) : super(key: key);

  final _Photo photo;
  final GridListDemoType tileStyle;

  @override
  Widget build(BuildContext context) {
    final Widget image = Material(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
      clipBehavior: Clip.antiAlias,
      child: Image.asset(
        photo.assetName,
        package: 'flutter_gallery_assets',
        fit: BoxFit.cover,
      ),
    );

    switch (tileStyle) {
      case GridListDemoType.imageOnly:
        return image;
      case GridListDemoType.header:
        return GridTile(
          header: Material(
            color: Colors.transparent,
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.vertical(top: Radius.circular(4)),
            ),
            clipBehavior: Clip.antiAlias,
            child: GridTileBar(
              title: _GridTitleText(photo.title),
              backgroundColor: Colors.black45,
            ),
          ),
          child: image,
        );
      case GridListDemoType.footer:
        return GridTile(
          footer: Material(
            color: Colors.transparent,
            shape: const RoundedRectangleBorder(
              borderRadius: BorderRadius.vertical(bottom: Radius.circular(4)),
            ),
            clipBehavior: Clip.antiAlias,
            child: GridTileBar(
              backgroundColor: Colors.black45,
              title: _GridTitleText(photo.title),
              subtitle: _GridTitleText(photo.subtitle),
            ),
          ),
          child: image,
        );
    }
    return null;
  }
}

#list
// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';

import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

enum ListDemoType {
  oneLine,
  twoLine,
}

class ListDemo extends StatelessWidget {
  const ListDemo({Key key, this.type}) : super(key: key);

  final ListDemoType type;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text(GalleryLocalizations.of(context).demoListsTitle),
      ),
      body: Scrollbar(
        child: ListView(
          padding: const EdgeInsets.symmetric(vertical: 8),
          children: [
            for (int index = 1; index < 21; index++)
              ListTile(
                leading: ExcludeSemantics(
                  child: CircleAvatar(child: Text('$index')),
                ),
                title: Text(
                  GalleryLocalizations.of(context).demoBottomSheetItem(index),
                ),
                subtitle: type == ListDemoType.twoLine
                    ? Text(GalleryLocalizations.of(context).demoListsSecondary)
                    : null,
              ),
          ],
        ),
      ),
    );
  }
}

#menu
// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';

import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

// Pressing the PopupMenuButton on the right of this item shows
// a simple menu with one disabled item. Typically the contents
// of this "contextual menu" would reflect the app's state.
class _ContextMenuDemo extends StatelessWidget {
  const _ContextMenuDemo({Key key, this.showInSnackBar}) : super(key: key);

  final void Function(String value) showInSnackBar;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(GalleryLocalizations.of(context)
          .demoMenuAnItemWithAContextMenuButton),
      trailing: PopupMenuButton<String>(
        padding: EdgeInsets.zero,
        onSelected: (value) => showInSnackBar(
          GalleryLocalizations.of(context).demoMenuSelected(value),
        ),
        itemBuilder: (context) => <PopupMenuItem<String>>[
          PopupMenuItem<String>(
            value: GalleryLocalizations.of(context).demoMenuContextMenuItemOne,
            child: Text(
              GalleryLocalizations.of(context).demoMenuContextMenuItemOne,
            ),
          ),
          PopupMenuItem<String>(
            enabled: false,
            child: Text(
              GalleryLocalizations.of(context).demoMenuADisabledMenuItem,
            ),
          ),
          PopupMenuItem<String>(
            value:
                GalleryLocalizations.of(context).demoMenuContextMenuItemThree,
            child: Text(
              GalleryLocalizations.of(context).demoMenuContextMenuItemThree,
            ),
          ),
        ],
      ),
    );
  }
}
#pickers
// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';
import 'package:intl/intl.dart';

enum PickerDemoType {
  date,
  time,
}

class PickerDemo extends StatefulWidget {
  const PickerDemo({Key key, this.type}) : super(key: key);

  final PickerDemoType type;

  @override
  _PickerDemoState createState() => _PickerDemoState();
}

class _PickerDemoState extends State<PickerDemo> {
  DateTime _fromDate = DateTime.now();
  TimeOfDay _fromTime = TimeOfDay.fromDateTime(DateTime.now());

  String get _title {
    switch (widget.type) {
      case PickerDemoType.date:
        return GalleryLocalizations.of(context).demoDatePickerTitle;
      case PickerDemoType.time:
        return GalleryLocalizations.of(context).demoTimePickerTitle;
    }
    return '';
  }

  String get _labelText {
    switch (widget.type) {
      case PickerDemoType.date:
        return DateFormat.yMMMd().format(_fromDate);
      case PickerDemoType.time:
        return _fromTime.format(context);
    }
    return '';
  }

  Future<void> _showDatePicker() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _fromDate,
      firstDate: DateTime(2015, 1),
      lastDate: DateTime(2100),
    );
    if (picked != null && picked != _fromDate) {
      setState(() {
        _fromDate = picked;
      });
    }
  }

  Future<void> _showTimePicker() async {
    final picked = await showTimePicker(
      context: context,
      initialTime: _fromTime,
    );
    if (picked != null && picked != _fromTime) {
      setState(() {
        _fromTime = picked;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text(_title),
      ),
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(_labelText),
            const SizedBox(height: 16),
            RaisedButton(
              child: Text(
                GalleryLocalizations.of(context).demoPickersShowPicker,
              ),
              onPressed: () {
                switch (widget.type) {
                  case PickerDemoType.date:
                    _showDatePicker();
                    break;
                  case PickerDemoType.time:
                    _showTimePicker();
                    break;
                }
              },
            )
          ],
        ),
      ),
    );
  }
}

#progress indicators
// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

enum ProgressIndicatorDemoType {
  circular,
  linear,
}

class ProgressIndicatorDemo extends StatefulWidget {
  const ProgressIndicatorDemo({Key key, this.type}) : super(key: key);

  final ProgressIndicatorDemoType type;

  @override
  _ProgressIndicatorDemoState createState() => _ProgressIndicatorDemoState();
}

class _ProgressIndicatorDemoState extends State<ProgressIndicatorDemo>
    with SingleTickerProviderStateMixin {
  AnimationController _controller;
  Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
      animationBehavior: AnimationBehavior.preserve,
    )..forward();

    _animation = CurvedAnimation(
      parent: _controller,
      curve: const Interval(0.0, 0.9, curve: Curves.fastOutSlowIn),
      reverseCurve: Curves.fastOutSlowIn,
    )..addStatusListener((status) {
        if (status == AnimationStatus.dismissed) {
          _controller.forward();
        } else if (status == AnimationStatus.completed) {
          _controller.reverse();
        }
      });
  }

  @override
  void dispose() {
    _controller.stop();
    super.dispose();
  }

  String get _title {
    switch (widget.type) {
      case ProgressIndicatorDemoType.circular:
        return GalleryLocalizations.of(context)
            .demoCircularProgressIndicatorTitle;
      case ProgressIndicatorDemoType.linear:
        return GalleryLocalizations.of(context)
            .demoLinearProgressIndicatorTitle;
    }
    return '';
  }

  Widget _buildIndicators(BuildContext context, Widget child) {
    switch (widget.type) {
      case ProgressIndicatorDemoType.circular:
        return Column(
          children: [
            const CircularProgressIndicator(),
            const SizedBox(height: 32),
            CircularProgressIndicator(value: _animation.value),
          ],
        );
      case ProgressIndicatorDemoType.linear:
        return Column(
          children: [
            const LinearProgressIndicator(),
            const SizedBox(height: 32),
            LinearProgressIndicator(value: _animation.value),
          ],
        );
      default:
        return Container();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text(_title),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.all(8),
            child: AnimatedBuilder(
              animation: _animation,
              builder: _buildIndicators,
            ),
          ),
        ),
      ),
    );
  }
}

#selection controls
// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:flutter/material.dart';

import 'package:flutter_gen/gen_l10n/gallery_localizations.dart';

class _CheckboxDemo extends StatefulWidget {
  @override
  _CheckboxDemoState createState() => _CheckboxDemoState();
}

class _CheckboxDemoState extends State<_CheckboxDemo> {
  bool checkboxValueA = true;
  bool checkboxValueB = false;
  bool checkboxValueC;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Checkbox(
            value: checkboxValueA,
            onChanged: (value) {
              setState(() {
                checkboxValueA = value;
              });
            },
          ),
          Checkbox(
            value: checkboxValueB,
            onChanged: (value) {
              setState(() {
                checkboxValueB = value;
              });
            },
          ),
          Checkbox(
            value: checkboxValueC,
            tristate: true,
            onChanged: (value) {
              setState(() {
                checkboxValueC = value;
              });
            },
          ),
        ],
      ),
    );
  }
}







